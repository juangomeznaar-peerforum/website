#!/usr/bin/env python3
"""Generate the Peerforum OG image with proper tagline line spacing."""

import os
import urllib.request
from PIL import Image, ImageDraw, ImageFont

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "public", "og-image.png")
FONTS_DIR = os.path.join(SCRIPT_DIR, ".fonts")

# OG image dimensions (1200x630 standard)
WIDTH, HEIGHT = 1200, 630

# Brand colors
BG_COLOR = (246, 248, 246)       # #F6F8F6
ACCENT_SAGE = (34, 84, 48)      # #225430


def download_font(url, filename):
    """Download a font file if not already cached."""
    os.makedirs(FONTS_DIR, exist_ok=True)
    path = os.path.join(FONTS_DIR, filename)
    if not os.path.exists(path):
        print(f"Downloading {filename}...")
        urllib.request.urlretrieve(url, path)
    return path


def get_fonts():
    """Download and return Lora and DM Sans fonts."""
    # Google Fonts direct TTF URLs
    lora_url = "https://github.com/cyrealtype/Lora-Cyrillic/raw/main/fonts/ttf/Lora-Medium.ttf"
    dm_sans_url = "https://raw.githubusercontent.com/google/fonts/main/ofl/dmsans/DMSans%5Bopsz%2Cwght%5D.ttf"

    lora_path = download_font(lora_url, "Lora-Medium.ttf")
    dm_sans_path = download_font(dm_sans_url, "DMSans-Medium.ttf")

    return lora_path, dm_sans_path


def generate():
    lora_path, dm_sans_path = get_fonts()

    # Load fonts
    logo_font = ImageFont.truetype(lora_path, 72)
    tagline_font = ImageFont.truetype(dm_sans_path, 14)

    # Create image
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    center_x = WIDTH // 2
    center_y = HEIGHT // 2

    # Draw logo "Peerforum."
    logo_text = "Peerforum."
    logo_bbox = draw.textbbox((0, 0), logo_text, font=logo_font)
    logo_w = logo_bbox[2] - logo_bbox[0]
    logo_h = logo_bbox[3] - logo_bbox[1]
    logo_x = center_x - logo_w // 2
    logo_y = center_y - logo_h // 2 - 40  # Shift up to make room for tagline
    draw.text((logo_x, logo_y), logo_text, fill=ACCENT_SAGE, font=logo_font)

    # Draw tagline with decorative lines
    tagline = "PEER COACHING GROUPS AT SCALE"
    tag_bbox = draw.textbbox((0, 0), tagline, font=tagline_font)
    tag_w = tag_bbox[2] - tag_bbox[0]
    tag_h = tag_bbox[3] - tag_bbox[1]

    tag_x = center_x - tag_w // 2
    tag_y = logo_y + logo_h + 30  # Below logo

    # Draw tagline text
    draw.text((tag_x, tag_y), tagline, fill=ACCENT_SAGE, font=tagline_font)

    # Decorative lines with proper gap (16px from text)
    gap = 16
    line_length = 40
    line_y = tag_y + tag_h // 2  # Vertically centered with text
    line_thickness = 1

    # Left line: ends before text starts
    left_line_end = tag_x - gap
    left_line_start = left_line_end - line_length
    draw.line(
        [(left_line_start, line_y), (left_line_end, line_y)],
        fill=ACCENT_SAGE,
        width=line_thickness,
    )

    # Right line: starts after text ends
    right_line_start = tag_x + tag_w + gap
    right_line_end = right_line_start + line_length
    draw.line(
        [(right_line_start, line_y), (right_line_end, line_y)],
        fill=ACCENT_SAGE,
        width=line_thickness,
    )

    # Save
    img.save(OUTPUT_PATH, "PNG", optimize=True)
    print(f"Generated: {OUTPUT_PATH}")

    # Also save as JPG
    jpg_path = OUTPUT_PATH.replace(".png", ".jpg")
    img.save(jpg_path, "JPEG", quality=90, optimize=True)
    print(f"Generated: {jpg_path}")


if __name__ == "__main__":
    generate()
