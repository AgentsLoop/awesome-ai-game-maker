#!/usr/bin/env python3
"""Prepare poster assets from the raw raster masters.

Pipeline: crop each transparent subject to its alpha bounding box plus a 3 percent
margin, downscale it to twice the displayed width, then encode the opaque plate as
JPEG and the alpha subjects as WebP. Run from the svg directory:

    python3 prepare-assets.py

Requirements: Pillow, plus sips and cwebp on PATH.
"""

from PIL import Image
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
MASTERS = os.path.join(HERE, "masters")
ASSETS = os.path.join(HERE, "assets")
PLATE = "bg-plate.png"
PLATE_JPEG_QUALITY = 80
WEBP_QUALITY = 80
WEBP_ALPHA_QUALITY = 85
MARGIN = 0.03
SUBJECTS = [("subject-robot", 760), ("subject-diorama", 1120), ("subject-tools", 940)]


def crop_to_alpha(path, out_path):
    image = Image.open(path).convert("RGBA")
    alpha = image.getchannel("A")
    box = alpha.point(lambda value: 255 if value > 8 else 0).getbbox()
    if box is None:
        raise SystemExit("No opaque pixels found in " + path)
    pad_x = int((box[2] - box[0]) * MARGIN)
    pad_y = int((box[3] - box[1]) * MARGIN)
    width, height = image.size
    crop = image.crop((
        max(0, box[0] - pad_x),
        max(0, box[1] - pad_y),
        min(width, box[2] + pad_x),
        min(height, box[3] + pad_y),
    ))
    crop.save(out_path)
    return crop.size


def resize_to_width(path, width, out_path):
    image = Image.open(path).convert("RGBA")
    if image.size[0] > width:
        height = round(image.size[1] * width / image.size[0])
        image = image.resize((width, height), Image.LANCZOS)
    image.save(out_path)
    return image.size


def run(command):
    subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    os.makedirs(ASSETS, exist_ok=True)
    run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", str(PLATE_JPEG_QUALITY),
         os.path.join(MASTERS, PLATE), "--out", os.path.join(ASSETS, "bg.jpg")])
    print("bg.jpg", os.path.getsize(os.path.join(ASSETS, "bg.jpg")), "bytes")
    for name, width in SUBJECTS:
        raw = os.path.join(MASTERS, name + ".png")
        crop = os.path.join(MASTERS, name + "-crop.png")
        retina = os.path.join(MASTERS, name + "-retina.png")
        crop_size = crop_to_alpha(raw, crop)
        retina_size = resize_to_width(crop, width, retina)
        webp = os.path.join(ASSETS, name.replace("subject-", "") + ".webp")
        run(["cwebp", "-q", str(WEBP_QUALITY), "-alpha_q", str(WEBP_ALPHA_QUALITY),
             "-m", "6", "-mt", retina, "-o", webp])
        print(name, "crop", crop_size, "retina", retina_size, "->", os.path.basename(webp),
              os.path.getsize(webp), "bytes")
    print("Next: node embed-assets.mjs poster.template.svg assets.json poster.svg")


if __name__ == "__main__":
    sys.exit(main())
