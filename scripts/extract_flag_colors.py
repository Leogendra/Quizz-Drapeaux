#!/usr/bin/env python3
"""
Extrait les couleurs dominantes des drapeaux (PNG) et les stocke dans pays.json.
Chaque pays reçoit un champ `colors: ["rouge", "bleu", ...]` trié par surface décroissante.
"""

import json
import colorsys
import io
import time
import sys
import urllib.request
from PIL import Image

# Palette de couleurs cibles pour les drapeaux
# Seuil min : une couleur doit couvrir au moins (THRESHOLD*100)% des pixels valides
THRESHOLD = 0.1

def pixel_to_color(r, g, b, a=255):
    """Mappe un pixel RGBA vers un nom de couleur de drapeau, ou None si transparent/gris neutre."""
    if a < 100:
        return None  # Transparent → ignoré

    # Conversion RGB→HLS (Python : H en [0,1], L en [0,1], S en [0,1])
    h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
    h_deg = h * 360
    sat = s * 100
    lum = l * 100

    # Achromatic (faible saturation)
    if sat < 12:
        if lum > 82:
            return "blanc"
        if lum < 22:
            return "noir"
        return None  # gris neutre → ignoré (bruit)

    # Chromatique : classification par teinte
    if h_deg < 15 or h_deg >= 340:
        return "rouge"
    if h_deg < 38:
        return "orange"
    if h_deg < 72:
        return "jaune"
    if h_deg < 165:
        return "vert"
    if h_deg < 265:
        return "bleu"     # inclut cyan/turquoise
    if h_deg < 305:
        return "violet"
    return "rouge"         # magenta → rouge

def extract_colors(png_url):
    """Télécharge le PNG et retourne la liste de couleurs triées par fréquence décroissante."""
    req = urllib.request.Request(
        png_url,
        headers={"User-Agent": "flag-color-extractor/1.0"}
    )
    with urllib.request.urlopen(req, timeout=15) as resp:
        raw = resp.read()

    img = Image.open(io.BytesIO(raw)).convert("RGBA")
    # Réduction pour vitesse (100×60 = 6000 pixels suffisent pour la distribution)
    img = img.resize((120, 72), Image.LANCZOS)

    counts = {}
    total = 0

    for pixel in img.getdata():  # noqa: PIL deprecation OK until Pillow 14
        r, g, b, a = pixel
        name = pixel_to_color(r, g, b, a)
        if name is None:
            continue
        counts[name] = counts.get(name, 0) + 1
        total += 1

    if total == 0:
        return []

    # Garder seulement les couleurs au-dessus du seuil, triées par fréquence
    result = [
        color for color, cnt in sorted(counts.items(), key=lambda x: -x[1])
        if cnt / total >= THRESHOLD
    ]
    return result


def main():
    json_path = "src/assets/data/pays.json"

    with open(json_path, "r", encoding="utf-8") as f:
        pays = json.load(f)

    total = len(pays)
    errors = []

    for i, country in enumerate(pays):
        name = country.get("name", {}).get("common", f"pays_{i}")
        png_url = country.get("flags", {}).get("png", "")

        if not png_url:
            print(f"[{i+1:3}/{total}] {name}: pas d'URL PNG", flush=True)
            country["colors"] = []
            continue

        print(f"[{i+1:3}/{total}] {name}... ", end="", flush=True)

        try:
            colors = extract_colors(png_url)
            country["colors"] = colors
            print(colors, flush=True)
        except Exception as e:
            print(f"ERREUR: {e}", flush=True)
            errors.append((name, str(e)))
            country.setdefault("colors", [])

        # Pause légère pour ne pas surcharger flagcdn.com
        time.sleep(0.1)

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(pays, f, ensure_ascii=False, indent=2)

    print(f"\nTerminé. {total - len(errors)}/{total} succès.")
    if errors:
        print("Échecs :")
        for name, err in errors:
            print(f"  - {name}: {err}")


if __name__ == "__main__":
    main()
