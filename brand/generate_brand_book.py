#!/usr/bin/env python3
"""
Peerforum Brand Book Generator
Generates a professional editorial PDF using reportlab.
"""

import math
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.units import mm, cm
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Brand Colors ──
COLORS = {
    'bg_base':      HexColor('#F6F8F6'),
    'bg_alt':       HexColor('#EBF0EC'),
    'text_main':    HexColor('#0A1C12'),
    'text_muted':   HexColor('#526656'),
    'accent_sage':  HexColor('#225430'),
    'accent_light': HexColor('#326B42'),
    'border_soft':  HexColor('#D3DCD4'),
    'surface_light':HexColor('#FAFAFA'),
    'surface_dark': HexColor('#0A1C12'),
}

W, H = A4  # 595.28 x 841.89 points
MARGIN = 50
CONTENT_W = W - 2 * MARGIN


def hex_to_rgb(hex_str):
    h = hex_str.lstrip('#')
    return tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))


class BrandBook:
    def __init__(self, filename):
        self.c = canvas.Canvas(filename, pagesize=A4)
        self.c.setTitle("Peerforum Brand Guidelines")
        self.c.setAuthor("Nautom")
        self.page_num = 0

    def save(self):
        self.c.save()

    def new_page(self, bg_color=None):
        if self.page_num > 0:
            self.c.showPage()
        self.page_num += 1
        if bg_color:
            self.c.setFillColor(bg_color)
            self.c.rect(0, 0, W, H, fill=1, stroke=0)

    def draw_page_number(self, color=None):
        if self.page_num <= 1:
            return
        c = color or COLORS['text_muted']
        self.c.setFillColor(c)
        self.c.setFont("Helvetica", 8)
        self.c.drawRightString(W - MARGIN, 30, str(self.page_num))

    # Isotipo dot data: hex grid pattern faithful to 2021 brand book
    # Coordinates in 200x200 viewBox, center at (100,100), boundary radius ~82
    # Generated with seed 2021 for deterministic layout
    ISOTIPO_DOTS = [
        (99.9, 25.9, 3.2), (85.2, 27.7, 3.8), (129.0, 28.0, 3.4),
        (73.0, 28.3, 3.1), (113.9, 28.5, 3.1), (147.9, 37.9, 3.4),
        (51.1, 38.0, 3.4), (106.7, 38.2, 3.9), (64.9, 38.5, 4.1),
        (92.3, 38.9, 4.1), (122.4, 39.2, 3.7), (135.1, 39.3, 3.6),
        (78.8, 40.9, 4.4), (84.7, 50.5, 5.1), (45.2, 50.6, 3.0),
        (58.9, 51.2, 4.1), (115.3, 51.2, 4.7), (127.0, 51.3, 5.0),
        (100.6, 51.7, 5.3), (71.6, 52.5, 4.0), (142.6, 52.8, 3.8),
        (154.5, 52.8, 3.5), (148.8, 62.2, 4.4), (37.4, 62.4, 3.9),
        (78.1, 62.4, 4.8), (107.8, 63.0, 6.4), (164.4, 63.2, 3.6),
        (63.8, 63.3, 5.4), (93.7, 63.8, 5.1), (50.8, 63.9, 4.5),
        (119.6, 63.9, 6.0), (134.0, 64.9, 4.5), (141.3, 74.4, 5.3),
        (115.4, 74.8, 6.2), (154.7, 74.8, 4.6), (85.9, 74.9, 6.8),
        (128.6, 74.9, 5.2), (57.0, 75.2, 4.6), (70.6, 75.7, 5.3),
        (30.3, 75.8, 3.2), (100.2, 75.9, 5.9), (44.9, 76.0, 4.3),
        (168.7, 76.6, 4.1), (38.4, 86.8, 3.8), (133.5, 86.8, 6.0),
        (162.3, 87.1, 4.9), (94.4, 87.2, 7.3), (108.1, 87.7, 7.9),
        (177.7, 88.1, 3.5), (65.8, 88.4, 6.3), (79.1, 88.4, 6.7),
        (121.1, 88.8, 7.0), (23.7, 89.0, 2.7), (49.8, 89.0, 5.4),
        (149.6, 89.2, 5.1), (72.9, 98.8, 5.8), (170.9, 99.1, 3.9),
        (86.8, 99.3, 8.2), (59.2, 99.9, 5.7), (43.2, 100.0, 4.9),
        (128.3, 100.0, 7.3), (100.5, 100.2, 9.2), (30.8, 100.7, 3.9),
        (113.7, 100.9, 8.3), (157.5, 101.0, 4.7), (143.1, 101.3, 5.2),
        (51.9, 111.1, 4.9), (37.1, 111.2, 4.3), (150.3, 111.2, 6.1),
        (177.4, 111.6, 3.4), (120.7, 111.7, 7.2), (64.9, 113.0, 6.5),
        (164.1, 113.0, 4.3), (93.0, 113.1, 6.4), (77.9, 113.2, 7.4),
        (106.8, 113.5, 7.6), (135.5, 113.5, 6.5), (23.7, 113.6, 2.7),
        (170.7, 122.9, 4.1), (155.4, 123.2, 4.8), (100.4, 124.2, 6.8),
        (72.9, 124.3, 6.6), (57.8, 124.6, 5.2), (126.7, 124.7, 5.7),
        (31.5, 124.9, 3.7), (141.5, 125.0, 5.6), (43.4, 125.1, 3.9),
        (85.9, 125.4, 7.3), (112.9, 125.4, 7.4), (51.3, 135.1, 3.7),
        (122.2, 135.6, 6.5), (38.2, 135.7, 3.4), (134.1, 136.4, 4.8),
        (161.8, 136.4, 3.8), (78.1, 136.7, 6.2), (64.6, 136.9, 5.4),
        (108.3, 137.1, 6.4), (149.3, 137.5, 4.6), (93.6, 137.7, 6.8),
        (42.8, 147.9, 3.3), (113.5, 148.1, 5.6), (142.9, 148.2, 4.8),
        (155.7, 148.3, 4.2), (87.3, 148.9, 5.4), (100.1, 148.9, 5.0),
        (127.1, 148.9, 4.6), (72.4, 149.3, 5.0), (59.3, 149.6, 3.8),
        (120.5, 159.3, 4.2), (147.7, 159.3, 3.8), (93.5, 159.6, 4.2),
        (135.9, 159.8, 3.5), (51.8, 160.0, 3.5), (106.8, 160.2, 4.3),
        (79.0, 160.7, 3.9), (63.6, 161.6, 3.2), (101.5, 171.6, 3.5),
        (126.6, 171.7, 3.6), (86.5, 173.0, 3.0), (70.6, 173.8, 2.7),
        (115.5, 174.2, 3.6),
    ]

    def draw_isotipo(self, cx, cy, radius, base_color=None):
        """Draw the Peerforum isotipo: a circle of dots of varying sizes.
        Uses fixed dot data from the 2021 brand book pattern, scaled to fit."""
        if base_color is None:
            base_color = COLORS['accent_sage']

        # Scale from 200x200 viewBox to target radius
        scale = radius / 100.0  # viewBox center is 100,100, effective radius ~82

        self.c.setFillColor(base_color)
        for dx, dy, dr in self.ISOTIPO_DOTS:
            x = cx + (dx - 100) * scale
            y = cy - (dy - 100) * scale  # flip Y for PDF coords
            r = dr * scale
            self.c.circle(x, y, r, fill=1, stroke=0)

    # ──────────────────────────────────────────────────────
    # PAGE 1: Cover
    # ──────────────────────────────────────────────────────
    def page_cover(self):
        self.new_page(COLORS['text_main'])

        # Isotipo centered, large
        self.draw_isotipo(W / 2, H / 2 + 60, 120, base_color=COLORS['accent_sage'])

        # Title
        self.c.setFillColor(COLORS['bg_base'])
        self.c.setFont("Helvetica-Bold", 36)
        self.c.drawCentredString(W / 2, H / 2 - 100, "Brand Guidelines")

        # Subtitle
        self.c.setFont("Helvetica", 14)
        self.c.setFillColor(COLORS['border_soft'])
        self.c.drawCentredString(W / 2, H / 2 - 130, "Version 1.0  —  April 2026")

        # Logo text at bottom
        self.c.setFillColor(COLORS['bg_base'])
        self.c.setFont("Helvetica", 24)
        self.c.drawCentredString(W / 2, 80, "Peerforum.")

    # ──────────────────────────────────────────────────────
    # PAGE 2: Table of Contents
    # ──────────────────────────────────────────────────────
    def page_toc(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 120
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 28)
        self.c.drawString(MARGIN, y, "Contents")
        y -= 50

        toc_items = [
            ("01", "About the Brand"),
            ("02", "Logo — Wordmark"),
            ("03", "Logo — Isotipo"),
            ("04", "Logo — Imagotipo"),
            ("05", "Logo Protection & Minimum Size"),
            ("06", "Color Palette"),
            ("07", "Typography"),
            ("08", "Button System"),
            ("09", "Applications"),
            ("10", "Incorrect Usage"),
            ("11", "Design Tokens"),
        ]

        for num, title in toc_items:
            self.c.setFont("Helvetica-Bold", 11)
            self.c.setFillColor(COLORS['accent_sage'])
            self.c.drawString(MARGIN, y, num)

            self.c.setFont("Helvetica", 13)
            self.c.setFillColor(COLORS['text_main'])
            self.c.drawString(MARGIN + 40, y, title)

            # Dotted line
            self.c.setStrokeColor(COLORS['border_soft'])
            self.c.setDash(1, 3)
            self.c.line(MARGIN + 40 + self.c.stringWidth(title, "Helvetica", 13) + 10, y + 3,
                        W - MARGIN - 30, y + 3)
            self.c.setDash()

            y -= 35

    # ──────────────────────────────────────────────────────
    # PAGE 3: About the Brand
    # ──────────────────────────────────────────────────────
    def page_about(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        # Section label
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "01  ABOUT THE BRAND")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 26)
        self.c.drawString(MARGIN, y, "Peerforum")
        y -= 30

        # Positioning statement
        body_lines = [
            "Peerforum is a full-service provider of peer coaching groups at scale.",
            "We design, operate, and facilitate high-end peer advisory forums for",
            "enterprise organizations, executive education programs, and premium",
            "communities of leaders.",
            "",
            "Founded in 2020 and based in Miami, Peerforum works with organizations",
            "that invest in leadership development — from Fortune 500 companies to",
            "associations like the SHRM Executive Network.",
        ]

        self.c.setFont("Helvetica", 11)
        self.c.setFillColor(COLORS['text_muted'])
        for line in body_lines:
            self.c.drawString(MARGIN, y, line)
            y -= 18

        y -= 30

        # Brand attributes
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 14)
        self.c.drawString(MARGIN, y, "Brand Attributes")
        y -= 30

        attributes = [
            ("Premium", "High-end positioning without pretension. Quality is implicit, never shouted."),
            ("Empathetic", "Deep understanding of executive isolation and the need for unfiltered peer feedback."),
            ("Operational", "Concrete, not philosophical. We explain the problem and deliver the solution."),
            ("Scalable", "From 5 to 500 groups with the same level of intimacy and quality."),
            ("Intimate", "Small-group dynamics at the core. Every leader is seen and heard."),
        ]

        for attr, desc in attributes:
            self.c.setFont("Helvetica-Bold", 11)
            self.c.setFillColor(COLORS['accent_sage'])
            self.c.drawString(MARGIN, y, attr)
            self.c.setFont("Helvetica", 10)
            self.c.setFillColor(COLORS['text_muted'])
            self.c.drawString(MARGIN + 100, y, desc)
            y -= 25

        y -= 30

        # Tone of Voice
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 14)
        self.c.drawString(MARGIN, y, "Tone of Voice")
        y -= 25

        tone_items = [
            "Premium but accessible — not generic corporate-speak",
            "Quiet confidence — lets numbers and outcomes speak",
            "Empathetic with the leader's pain — understands executive isolation",
            "Operationally concrete — explains the what and how, not just the why",
        ]

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        for item in tone_items:
            self.c.drawString(MARGIN + 15, y, f"—  {item}")
            y -= 20

        y -= 30

        # Tagline
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 14)
        self.c.drawString(MARGIN, y, "Tagline")
        y -= 25
        self.c.setFont("Helvetica-Oblique", 18)
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.drawString(MARGIN, y, '"Executive peer groups. Without the pain."')

    # ──────────────────────────────────────────────────────
    # PAGE 4: Wordmark
    # ──────────────────────────────────────────────────────
    def page_wordmark(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "02  LOGO — WORDMARK")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "The Peerforum Wordmark")
        y -= 25

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        desc = [
            "The Peerforum wordmark is derived from modifications of Rozanova GEO Semi Bold,",
            "a geometric sans-serif typeface. It features custom letter forms: geometric 'e' with",
            "straight cuts, clean 'f' strokes, and highly rounded 'o' and 'u' characters.",
            "",
            "In the website implementation, the logo renders as 'Peerforum.' (with trailing period)",
            "in Lora serif at font-weight 500. The period is part of the brand identity.",
        ]
        for line in desc:
            self.c.drawString(MARGIN, y, line)
            y -= 16

        y -= 30

        # Light background demo
        self.c.setFillColor(COLORS['bg_alt'])
        self.c.roundRect(MARGIN, y - 80, CONTENT_W, 100, 16, fill=1, stroke=0)
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica", 32)
        self.c.drawCentredString(W / 2, y - 40, "Peerforum.")
        self.c.setFont("Helvetica", 9)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawCentredString(W / 2, y - 65, "On light background  —  #0A1C12")

        y -= 120

        # Dark background demo
        self.c.setFillColor(COLORS['text_main'])
        self.c.roundRect(MARGIN, y - 80, CONTENT_W, 100, 16, fill=1, stroke=0)
        self.c.setFillColor(COLORS['bg_base'])
        self.c.setFont("Helvetica", 32)
        self.c.drawCentredString(W / 2, y - 40, "Peerforum.")
        self.c.setFont("Helvetica", 9)
        self.c.setFillColor(COLORS['border_soft'])
        self.c.drawCentredString(W / 2, y - 65, "On dark background  —  #F6F8F6")

        y -= 130

        # Notes
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(MARGIN, y, "Usage Notes")
        y -= 22

        notes = [
            "The trailing period is always included: 'Peerforum.' not 'Peerforum'",
            "The wordmark is one word with capital P: 'Peerforum' not 'PeerForum' or 'PEERFORUM'",
            "Do not substitute the typeface — use the approved wordmark or Lora serif rendering",
            "Maintain sufficient contrast: use #0A1C12 on light, #F6F8F6 on dark backgrounds",
        ]

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        for note in notes:
            self.c.drawString(MARGIN + 15, y, f"—  {note}")
            y -= 18

    # ──────────────────────────────────────────────────────
    # PAGE 5: Isotipo
    # ──────────────────────────────────────────────────────
    def page_isotipo(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "03  LOGO — ISOTIPO")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "The Dot Circle")
        y -= 25

        desc = [
            "The Peerforum isotipo is a circle composed of approximately 120 dots of",
            "varying sizes arranged in a hexagonal grid. Larger dots concentrate toward",
            "the center, while smaller dots disperse toward the periphery.",
            "",
            "The dots represent the diversity of leaders and peers. The circular arrangement",
            "symbolizes group cohesion and equality. Some dots merge together, reflecting the",
            "connections formed through peer coaching.",
        ]
        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        for line in desc:
            self.c.drawString(MARGIN, y, line)
            y -= 16

        y -= 20

        # Isotipo on light
        box_h = 160
        self.c.setFillColor(COLORS['bg_alt'])
        self.c.roundRect(MARGIN, y - box_h, CONTENT_W / 2 - 10, box_h, 16, fill=1, stroke=0)
        self.draw_isotipo(MARGIN + CONTENT_W / 4 - 5, y - box_h / 2, 55, COLORS['accent_sage'])
        self.c.setFont("Helvetica", 8)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawCentredString(MARGIN + CONTENT_W / 4 - 5, y - box_h - 15, "On light  —  #225430")

        # Isotipo on dark
        self.c.setFillColor(COLORS['text_main'])
        self.c.roundRect(W / 2 + 10, y - box_h, CONTENT_W / 2 - 10, box_h, 16, fill=1, stroke=0)
        self.draw_isotipo(W / 2 + 10 + CONTENT_W / 4 - 5, y - box_h / 2, 55, COLORS['bg_base'])
        self.c.setFont("Helvetica", 8)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawCentredString(W / 2 + 10 + CONTENT_W / 4 - 5, y - box_h - 15, "On dark  —  #F6F8F6")

        y -= box_h + 40

        # Monochrome
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(MARGIN, y, "Monochrome Variant")
        y -= 25

        self.c.setFillColor(white)
        self.c.setStrokeColor(COLORS['border_soft'])
        self.c.roundRect(MARGIN, y - 120, CONTENT_W / 3, 120, 16, fill=1, stroke=1)
        self.draw_isotipo(MARGIN + CONTENT_W / 6, y - 60, 40, COLORS['text_main'])
        self.c.setFont("Helvetica", 8)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawCentredString(MARGIN + CONTENT_W / 6, y - 135, "Monochrome  —  #0A1C12")

    # ──────────────────────────────────────────────────────
    # PAGE 6: Imagotipo
    # ──────────────────────────────────────────────────────
    def page_imagotipo(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "04  LOGO — IMAGOTIPO")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "Isotipo + Wordmark Combinations")
        y -= 25

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        combo_desc = [
            "The imagotipo combines the dot circle isotipo with the Peerforum wordmark.",
            "Two approved layouts exist: horizontal and vertical (stacked).",
        ]
        for line in combo_desc:
            self.c.drawString(MARGIN, y, line)
            y -= 16

        y -= 30

        # Horizontal version
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "Horizontal")
        y -= 20

        box_h = 100
        self.c.setFillColor(COLORS['bg_alt'])
        self.c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 16, fill=1, stroke=0)

        # Draw isotipo + wordmark horizontally
        iso_cx = MARGIN + 80
        iso_cy = y - box_h / 2
        self.draw_isotipo(iso_cx, iso_cy, 30, COLORS['accent_sage'])
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica", 26)
        self.c.drawString(iso_cx + 50, iso_cy - 10, "Peerforum.")

        y -= box_h + 40

        # Vertical (stacked) version
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "Vertical (Stacked)")
        y -= 20

        box_h = 180
        self.c.setFillColor(COLORS['bg_alt'])
        self.c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 16, fill=1, stroke=0)

        # Draw isotipo above wordmark
        iso_cx = W / 2
        iso_cy = y - 60
        self.draw_isotipo(iso_cx, iso_cy, 35, COLORS['accent_sage'])
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica", 24)
        self.c.drawCentredString(W / 2, y - box_h + 35, "Peerforum.")

        y -= box_h + 40

        # Dark background versions
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "On Dark Background")
        y -= 20

        box_h = 100
        self.c.setFillColor(COLORS['text_main'])
        self.c.roundRect(MARGIN, y - box_h, CONTENT_W, box_h, 16, fill=1, stroke=0)

        iso_cx = MARGIN + 80
        iso_cy = y - box_h / 2
        self.draw_isotipo(iso_cx, iso_cy, 30, COLORS['bg_base'])
        self.c.setFillColor(COLORS['bg_base'])
        self.c.setFont("Helvetica", 26)
        self.c.drawString(iso_cx + 50, iso_cy - 10, "Peerforum.")

    # ──────────────────────────────────────────────────────
    # PAGE 7: Protection & Minimum Size
    # ──────────────────────────────────────────────────────
    def page_protection(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "05  LOGO PROTECTION & MINIMUM SIZE")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "Clear Space & Sizing")
        y -= 30

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        desc = [
            "The clear space around the logo ensures legibility and impact.",
            "The minimum clear space is defined as 1x the cap height of the 'P'",
            "in the wordmark, measured on all four sides.",
        ]
        for line in desc:
            self.c.drawString(MARGIN, y, line)
            y -= 16

        y -= 30

        # Safety area diagram
        box_w = 300
        box_h = 120
        bx = (W - box_w) / 2
        by = y - box_h

        # Dashed boundary
        self.c.setStrokeColor(COLORS['accent_sage'])
        self.c.setDash(4, 4)
        self.c.setLineWidth(1)
        self.c.rect(bx, by, box_w, box_h, fill=0, stroke=1)
        self.c.setDash()

        # Inner box
        margin_zone = 25
        self.c.setFillColor(COLORS['bg_alt'])
        self.c.rect(bx + margin_zone, by + margin_zone,
                    box_w - 2 * margin_zone, box_h - 2 * margin_zone, fill=1, stroke=0)

        # Logo text inside
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica", 22)
        self.c.drawCentredString(W / 2, by + box_h / 2 - 8, "Peerforum.")

        # Labels
        self.c.setFont("Helvetica", 8)
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.drawCentredString(W / 2, by + box_h + 8, "1x clear space on all sides")

        # Arrows
        arrow_color = COLORS['accent_sage']
        self.c.setStrokeColor(arrow_color)
        self.c.setLineWidth(0.5)
        # Top arrow
        mid_x = W / 2 + 80
        self.c.line(mid_x, by + box_h, mid_x, by + box_h - margin_zone)
        # Bottom arrow
        self.c.line(mid_x, by, mid_x, by + margin_zone)

        y -= box_h + 60

        # Minimum sizes
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 14)
        self.c.drawString(MARGIN, y, "Minimum Sizes")
        y -= 30

        sizes = [
            ("Digital (wordmark)", "100px wide"),
            ("Digital (isotipo)", "32px wide"),
            ("Print (wordmark)", "25mm wide"),
            ("Print (isotipo)", "10mm wide"),
            ("Favicon", "16×16, 32×32, 180×180 (apple-touch), 512×512"),
        ]

        for label, value in sizes:
            self.c.setFont("Helvetica-Bold", 10)
            self.c.setFillColor(COLORS['text_main'])
            self.c.drawString(MARGIN, y, label)
            self.c.setFont("Helvetica", 10)
            self.c.setFillColor(COLORS['text_muted'])
            self.c.drawString(MARGIN + 180, y, value)
            y -= 22

    # ──────────────────────────────────────────────────────
    # PAGE 8: Color Palette
    # ──────────────────────────────────────────────────────
    def page_colors(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "06  COLOR PALETTE")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "Brand Colors")
        y -= 25

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawString(MARGIN, y, "The Peerforum palette is rooted in nature — forest greens, sage, and warm off-whites.")
        y -= 16
        self.c.drawString(MARGIN, y, "Pure white and pure black are never used. Every shade carries a green tint.")
        y -= 40

        palette = [
            ("Base Background",  "#F6F8F6", "Main page background, light text on dark",  COLORS['bg_base']),
            ("Alt Background",   "#EBF0EC", "Alternate sections, hover states",           COLORS['bg_alt']),
            ("Primary Text",     "#0A1C12", "Headings, body text, dark sections/footer",  COLORS['text_main']),
            ("Muted Text",       "#526656", "Secondary text, captions, placeholders",     COLORS['text_muted']),
            ("Accent Sage",      "#225430", "Links, active states, highlights, labels",   COLORS['accent_sage']),
            ("Accent Light",     "#326B42", "Hover states, secondary accent",             COLORS['accent_light']),
            ("Border Soft",      "#D3DCD4", "Borders, dividers, card outlines",           COLORS['border_soft']),
            ("Surface Light",    "#FAFAFA", "Cards, elevated surfaces",                   COLORS['surface_light']),
        ]

        swatch_size = 50
        col1_x = MARGIN
        col2_x = W / 2 + 10

        for i, (name, hex_val, usage, color) in enumerate(palette):
            col = col1_x if i % 2 == 0 else col2_x
            row_y = y - (i // 2) * 85

            # Swatch
            self.c.setFillColor(color)
            self.c.setStrokeColor(COLORS['border_soft'])
            self.c.roundRect(col, row_y - swatch_size, swatch_size, swatch_size, 8, fill=1, stroke=1)

            # Name & hex
            text_x = col + swatch_size + 12
            self.c.setFillColor(COLORS['text_main'])
            self.c.setFont("Helvetica-Bold", 11)
            self.c.drawString(text_x, row_y - 15, name)

            self.c.setFont("Helvetica", 10)
            self.c.setFillColor(COLORS['accent_sage'])
            self.c.drawString(text_x, row_y - 30, hex_val)

            self.c.setFont("Helvetica", 8.5)
            self.c.setFillColor(COLORS['text_muted'])
            # Truncate usage text to fit
            max_w = (W / 2 - swatch_size - 30) if i % 2 == 0 else (W / 2 - swatch_size - 30)
            self.c.drawString(text_x, row_y - 44, usage[:55])

        y -= (len(palette) // 2) * 85 + 30

        # Usage rules
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 12)
        self.c.drawString(MARGIN, y, "Color Rules")
        y -= 22

        rules = [
            "Never use pure white (#FFFFFF) or pure black (#000000)",
            "Dark sections use #0A1C12 background with #F6F8F6 text",
            "Accent Sage (#225430) is reserved for interactive elements",
            "Background alternation: #F6F8F6 and #EBF0EC for visual rhythm",
        ]
        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        for rule in rules:
            self.c.drawString(MARGIN + 15, y, f"—  {rule}")
            y -= 18

    # ──────────────────────────────────────────────────────
    # PAGE 9: Typography
    # ──────────────────────────────────────────────────────
    def page_typography(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "07  TYPOGRAPHY")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "Type System")
        y -= 40

        # Lora section
        self.c.setFont("Helvetica-Bold", 14)
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.drawString(MARGIN, y, "Lora  —  Serif")
        y -= 22

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        lora_desc = [
            "Used for: Headings (H1–H4), logo rendering, editorial emphasis",
            "Weights: 400 (Regular), 500 (Medium), 600 (Semi Bold)",
            "Styles: Normal, Italic (for emphasis phrases like 'Without the pain.')",
            "Source: Google Fonts — fonts.google.com/specimen/Lora",
        ]
        for line in lora_desc:
            self.c.drawString(MARGIN + 15, y, line)
            y -= 16

        y -= 10

        # Lora scale demo
        lora_sizes = [
            ("H1 Hero", "Helvetica-Bold", 36, "Executive peer groups."),
            ("H2 Section", "Helvetica-Bold", 24, "How It Works"),
            ("H3 Card", "Helvetica-Bold", 18, "Peer Coaching at Scale"),
            ("H4 Sub", "Helvetica-Bold", 14, "The Forum Model"),
        ]

        for label, font, size, text in lora_sizes:
            self.c.setFont("Helvetica", 8)
            self.c.setFillColor(COLORS['text_muted'])
            self.c.drawString(MARGIN, y + 2, label)

            self.c.setFont(font, min(size, 36))
            self.c.setFillColor(COLORS['text_main'])
            self.c.drawString(MARGIN + 80, y, text)
            y -= size + 12

        y -= 20

        # DM Sans section
        self.c.setFont("Helvetica-Bold", 14)
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.drawString(MARGIN, y, "DM Sans  —  Sans-serif")
        y -= 22

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        dm_desc = [
            "Used for: Body text, navigation, buttons, labels, UI elements",
            "Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi Bold)",
            "Source: Google Fonts — fonts.google.com/specimen/DM+Sans",
        ]
        for line in dm_desc:
            self.c.drawString(MARGIN + 15, y, line)
            y -= 16

        y -= 10

        # DM Sans scale demo
        dm_sizes = [
            ("Body", "Helvetica", 12, "Peerforum designs, operates, and facilitates peer coaching groups."),
            ("Nav", "Helvetica", 11, "Community    Education    Enterprise    About"),
            ("Label", "Helvetica-Bold", 9, "HOW IT WORKS"),
            ("Button", "Helvetica", 10, "Talk to Us"),
            ("Caption", "Helvetica", 9, "Full-service provider of peer coaching groups at scale"),
        ]

        for label, font, size, text in dm_sizes:
            self.c.setFont("Helvetica", 8)
            self.c.setFillColor(COLORS['text_muted'])
            self.c.drawString(MARGIN, y + 2, label)

            self.c.setFont(font, size)
            self.c.setFillColor(COLORS['text_main'])
            self.c.drawString(MARGIN + 80, y, text)
            y -= size + 12

    # ──────────────────────────────────────────────────────
    # PAGE 10: Button System
    # ──────────────────────────────────────────────────────
    def page_buttons(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "08  BUTTON SYSTEM")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "Interactive Elements")
        y -= 25

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawString(MARGIN, y, "All buttons use pill shape (fully rounded), DM Sans Medium at 14px with wide tracking.")
        y -= 40

        buttons = [
            ("Primary", COLORS['text_main'], COLORS['bg_base'], COLORS['text_main'],
             "Dark fill, light text. Shimmer hover effect + scale 1.02. Main CTAs."),
            ("Secondary", None, COLORS['text_main'], COLORS['text_main'],
             "Transparent fill, dark border + text. On hover: fills dark, text goes light."),
            ("Tertiary", COLORS['bg_base'], COLORS['text_main'], COLORS['bg_base'],
             "Light fill, dark text. Used on dark backgrounds (footer CTA)."),
        ]

        for name, bg, text_col, border_col, desc in buttons:
            # Button label
            self.c.setFillColor(COLORS['text_main'])
            self.c.setFont("Helvetica-Bold", 13)
            self.c.drawString(MARGIN, y, name)
            y -= 20

            # Draw button
            btn_w = 160
            btn_h = 40
            btn_x = MARGIN
            btn_y = y - btn_h

            if bg:
                self.c.setFillColor(bg)
                self.c.roundRect(btn_x, btn_y, btn_w, btn_h, btn_h / 2, fill=1, stroke=0)
            else:
                self.c.setFillColor(COLORS['bg_base'])
                self.c.roundRect(btn_x, btn_y, btn_w, btn_h, btn_h / 2, fill=1, stroke=0)

            self.c.setStrokeColor(border_col)
            self.c.setLineWidth(1)
            self.c.roundRect(btn_x, btn_y, btn_w, btn_h, btn_h / 2, fill=0, stroke=1)

            self.c.setFillColor(text_col)
            self.c.setFont("Helvetica", 11)
            self.c.drawCentredString(btn_x + btn_w / 2, btn_y + btn_h / 2 - 4, "Talk to Us")

            # Description
            self.c.setFont("Helvetica", 9)
            self.c.setFillColor(COLORS['text_muted'])
            self.c.drawString(btn_x + btn_w + 20, btn_y + btn_h / 2 - 4, desc)

            y -= btn_h + 30

        y -= 20

        # Button specs
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "Specifications")
        y -= 25

        specs = [
            ("Border radius", "Fully rounded (pill shape) — rounded-full"),
            ("Default padding", "24px horizontal, 12px vertical (px-6 py-3)"),
            ("Large padding", "32px horizontal, 16px vertical (px-8 py-4)"),
            ("Font", "DM Sans, Medium (500), 14px, tracking-wide"),
            ("Transition", "all 0.3s ease-out"),
            ("Hover (primary)", "Background → #225430, transform: scale(1.02), shimmer overlay"),
            ("Hover (secondary)", "Background → #0A1C12, text → #F6F8F6"),
        ]

        for label, value in specs:
            self.c.setFont("Helvetica-Bold", 9)
            self.c.setFillColor(COLORS['text_main'])
            self.c.drawString(MARGIN, y, label)
            self.c.setFont("Helvetica", 9)
            self.c.setFillColor(COLORS['text_muted'])
            self.c.drawString(MARGIN + 130, y, value)
            y -= 16

    # ──────────────────────────────────────────────────────
    # PAGE 11: Applications
    # ──────────────────────────────────────────────────────
    def page_applications(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "09  APPLICATIONS")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "Brand Applications")
        y -= 40

        # Business Card
        self.c.setFont("Helvetica-Bold", 13)
        self.c.setFillColor(COLORS['text_main'])
        self.c.drawString(MARGIN, y, "Business Card")
        y -= 20

        # Card front
        card_w = 220
        card_h = 130
        card_x = MARGIN

        # Front (dark)
        self.c.setFillColor(COLORS['text_main'])
        self.c.roundRect(card_x, y - card_h, card_w, card_h, 8, fill=1, stroke=0)
        self.draw_isotipo(card_x + 40, y - 40, 18, COLORS['accent_sage'])
        self.c.setFillColor(COLORS['bg_base'])
        self.c.setFont("Helvetica", 16)
        self.c.drawString(card_x + 20, y - card_h + 40, "Peerforum.")
        self.c.setFont("Helvetica", 7)
        self.c.setFillColor(COLORS['border_soft'])
        self.c.drawString(card_x + 20, y - card_h + 20, "peerforum.com")

        # Back (light)
        card_x2 = card_x + card_w + 30
        self.c.setFillColor(COLORS['bg_base'])
        self.c.setStrokeColor(COLORS['border_soft'])
        self.c.roundRect(card_x2, y - card_h, card_w, card_h, 8, fill=1, stroke=1)

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(card_x2 + 20, y - 30, "Steve Brechner")
        self.c.setFont("Helvetica", 8)
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.drawString(card_x2 + 20, y - 45, "Founder & CEO")
        self.c.setFont("Helvetica", 7)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawString(card_x2 + 20, y - 65, "steve@peerforum.com")
        self.c.drawString(card_x2 + 20, y - 78, "peerforum.com")
        self.c.drawString(card_x2 + 20, y - 91, "Miami, FL")

        self.c.setFont("Helvetica", 7)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawString(MARGIN, y - card_h - 15, "Front")
        self.c.drawString(card_x2, y - card_h - 15, "Back")

        y -= card_h + 50

        # Email Signature
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "Email Signature")
        y -= 20

        sig_w = CONTENT_W
        sig_h = 90
        self.c.setFillColor(white)
        self.c.setStrokeColor(COLORS['border_soft'])
        self.c.roundRect(MARGIN, y - sig_h, sig_w, sig_h, 8, fill=1, stroke=1)

        # Divider line
        div_x = MARGIN + 80
        self.c.setStrokeColor(COLORS['accent_sage'])
        self.c.setLineWidth(2)
        self.c.line(div_x, y - 15, div_x, y - sig_h + 15)
        self.c.setLineWidth(1)

        # Isotipo
        self.draw_isotipo(MARGIN + 40, y - sig_h / 2, 22, COLORS['accent_sage'])

        # Text
        tx = div_x + 15
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 11)
        self.c.drawString(tx, y - 25, "Steve Brechner")
        self.c.setFont("Helvetica", 9)
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.drawString(tx, y - 40, "Founder & CEO  |  Peerforum")
        self.c.setFont("Helvetica", 8)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawString(tx, y - 55, "steve@peerforum.com  |  peerforum.com")
        self.c.drawString(tx, y - 68, "Miami, FL")

        y -= sig_h + 50

        # Social Avatar
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "Social Media Avatar")
        y -= 20

        avatar_size = 80
        # Dark avatar
        self.c.setFillColor(COLORS['text_main'])
        self.c.roundRect(MARGIN, y - avatar_size, avatar_size, avatar_size, 12, fill=1, stroke=0)
        self.draw_isotipo(MARGIN + avatar_size / 2, y - avatar_size / 2, 25, COLORS['accent_sage'])

        # Light avatar
        self.c.setFillColor(COLORS['bg_alt'])
        self.c.setStrokeColor(COLORS['border_soft'])
        self.c.roundRect(MARGIN + avatar_size + 20, y - avatar_size, avatar_size, avatar_size, 12, fill=1, stroke=1)
        self.draw_isotipo(MARGIN + avatar_size + 20 + avatar_size / 2, y - avatar_size / 2, 25, COLORS['accent_sage'])

        # Labels
        self.c.setFont("Helvetica", 7)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawCentredString(MARGIN + avatar_size / 2, y - avatar_size - 12, "Dark variant")
        self.c.drawCentredString(MARGIN + avatar_size + 20 + avatar_size / 2, y - avatar_size - 12, "Light variant")

    # ──────────────────────────────────────────────────────
    # PAGE 12: Incorrect Usage
    # ──────────────────────────────────────────────────────
    def page_incorrect(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "10  INCORRECT USAGE")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "What Not to Do")
        y -= 25

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawString(MARGIN, y, "These rules protect the integrity and consistency of the Peerforum brand.")
        y -= 45

        donts = [
            ("Do not distort the logo", "Never stretch, compress, rotate, or skew the wordmark or isotipo."),
            ("Do not change logo colors", "Only use approved color combinations: #0A1C12 on light, #F6F8F6 on dark."),
            ("Do not use on low-contrast backgrounds", "Ensure sufficient contrast. Never place on medium grays or busy images."),
            ("Do not alter the isotipo", "Never rearrange, add, or remove dots from the circle pattern."),
            ("Do not use pure white or black", "Always use the brand palette. #F6F8F6 replaces white, #0A1C12 replaces black."),
            ("Do not add effects to the logo", "No drop shadows, glows, gradients, outlines, or 3D effects on the logo."),
            ("Do not change the spelling", "It's 'Peerforum' (one word, capital P). Not 'PeerForum', 'Peer Forum', or 'PEERFORUM'."),
            ("Do not remove the trailing period", "The wordmark is 'Peerforum.' — the period is part of the brand identity."),
            ("Do not use unapproved fonts", "Headings in Lora, body in DM Sans. No substitutions without approval."),
            ("Do not crowd the logo", "Always maintain the minimum clear space around the wordmark and isotipo."),
        ]

        for title, desc in donts:
            # Red X marker
            self.c.setFillColor(HexColor('#C4483E'))
            self.c.setFont("Helvetica-Bold", 14)
            self.c.drawString(MARGIN, y, "✕")

            self.c.setFillColor(COLORS['text_main'])
            self.c.setFont("Helvetica-Bold", 11)
            self.c.drawString(MARGIN + 25, y, title)
            y -= 16

            self.c.setFont("Helvetica", 9.5)
            self.c.setFillColor(COLORS['text_muted'])
            self.c.drawString(MARGIN + 25, y, desc)
            y -= 30

    # ──────────────────────────────────────────────────────
    # PAGE 13: Design Tokens
    # ──────────────────────────────────────────────────────
    def page_tokens(self):
        self.new_page(COLORS['bg_base'])
        self.draw_page_number()

        y = H - 100
        self.c.setFillColor(COLORS['accent_sage'])
        self.c.setFont("Helvetica-Bold", 10)
        self.c.drawString(MARGIN, y, "11  DESIGN TOKENS")
        y -= 50

        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 22)
        self.c.drawString(MARGIN, y, "Tokens for Development")
        y -= 25

        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawString(MARGIN, y, "Copy-paste ready tokens for CSS custom properties and Tailwind CSS v4+.")
        y -= 40

        # CSS Variables
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "CSS Custom Properties")
        y -= 20

        code_bg = COLORS['text_main']
        code_block = [
            "@theme {",
            "  --font-sans: var(--font-dm-sans), 'DM Sans', sans-serif;",
            "  --font-serif: var(--font-lora), 'Lora', serif;",
            "",
            "  --color-bg-base: #F6F8F6;",
            "  --color-bg-alt: #EBF0EC;",
            "  --color-text-main: #0A1C12;",
            "  --color-text-muted: #526656;",
            "  --color-accent-sage: #225430;",
            "  --color-accent-sage-light: #326B42;",
            "  --color-border-soft: #D3DCD4;",
            "  --color-surface-light: #FAFAFA;",
            "  --color-surface-dark: #0A1C12;",
            "}",
        ]

        block_h = len(code_block) * 14 + 20
        self.c.setFillColor(code_bg)
        self.c.roundRect(MARGIN, y - block_h, CONTENT_W, block_h, 8, fill=1, stroke=0)

        self.c.setFillColor(COLORS['bg_base'])
        self.c.setFont("Courier", 9)
        code_y = y - 15
        for line in code_block:
            self.c.drawString(MARGIN + 15, code_y, line)
            code_y -= 14

        y -= block_h + 30

        # Tailwind usage
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "Tailwind CSS Usage")
        y -= 20

        tw_examples = [
            ("Background",  "bg-[#F6F8F6]  bg-[#EBF0EC]  bg-[#0A1C12]"),
            ("Text color",  "text-[#0A1C12]  text-[#526656]  text-[#F6F8F6]"),
            ("Border",      "border-[#D3DCD4]  border-[#526656]"),
            ("Accent",      "text-[#225430]  bg-[#225430]  hover:bg-[#326B42]"),
        ]

        for label, code in tw_examples:
            self.c.setFont("Helvetica-Bold", 10)
            self.c.setFillColor(COLORS['text_main'])
            self.c.drawString(MARGIN, y, label)
            self.c.setFont("Courier", 9)
            self.c.setFillColor(COLORS['accent_sage'])
            self.c.drawString(MARGIN + 100, y, code)
            y -= 20

        y -= 20

        # Font imports
        self.c.setFillColor(COLORS['text_main'])
        self.c.setFont("Helvetica-Bold", 13)
        self.c.drawString(MARGIN, y, "Next.js Font Import")
        y -= 20

        font_code = [
            "import { Lora, DM_Sans } from 'next/font/google';",
            "",
            "const lora = Lora({",
            "  subsets: ['latin'],",
            "  weight: ['400', '500', '600'],",
            "  style: ['normal', 'italic'],",
            "  variable: '--font-lora',",
            "  display: 'swap',",
            "});",
            "",
            "const dmSans = DM_Sans({",
            "  subsets: ['latin'],",
            "  weight: ['300', '400', '500', '600'],",
            "  variable: '--font-dm-sans',",
            "  display: 'swap',",
            "});",
        ]

        block_h = len(font_code) * 14 + 20
        self.c.setFillColor(code_bg)
        self.c.roundRect(MARGIN, y - block_h, CONTENT_W, block_h, 8, fill=1, stroke=0)

        self.c.setFillColor(COLORS['bg_base'])
        self.c.setFont("Courier", 9)
        code_y = y - 15
        for line in font_code:
            self.c.drawString(MARGIN + 15, code_y, line)
            code_y -= 14

    # ──────────────────────────────────────────────────────
    # PAGE 14: Back Cover
    # ──────────────────────────────────────────────────────
    def page_back_cover(self):
        self.new_page(COLORS['text_main'])

        # Isotipo centered
        self.draw_isotipo(W / 2, H / 2 + 30, 80, COLORS['accent_sage'])

        # URL
        self.c.setFillColor(COLORS['border_soft'])
        self.c.setFont("Helvetica", 14)
        self.c.drawCentredString(W / 2, H / 2 - 80, "peerforum.com")

        # Year
        self.c.setFont("Helvetica", 10)
        self.c.setFillColor(COLORS['text_muted'])
        self.c.drawCentredString(W / 2, 60, "© 2026 Peerforum. All rights reserved.")

    def generate(self):
        self.page_cover()
        self.page_toc()
        self.page_about()
        self.page_wordmark()
        self.page_isotipo()
        self.page_imagotipo()
        self.page_protection()
        self.page_colors()
        self.page_typography()
        self.page_buttons()
        self.page_applications()
        self.page_incorrect()
        self.page_tokens()
        self.page_back_cover()
        self.save()


if __name__ == "__main__":
    import os
    output_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(output_dir, "Peerforum-Brand-Book.pdf")
    book = BrandBook(output_path)
    book.generate()
    print(f"Brand book generated: {output_path}")
