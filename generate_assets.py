# -*- coding: utf-8 -*-
"""
CareerBridge -- generate logo + LinkedIn banner via Pillow.
Run: python generate_assets.py
"""
from PIL import Image, ImageDraw, ImageFont
import math, os, sys

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")
os.makedirs(OUT_DIR, exist_ok=True)

# ── colours ──────────────────────────────────────────────────────────────────
NAVY      = (11,  31,  77)
BLUE      = (37, 99, 235)
SKY       = (96, 165, 250)
WHITE     = (255, 255, 255)
GREY      = (148, 163, 184)
LIGHT_BG  = (248, 250, 252)

# ── font helpers ─────────────────────────────────────────────────────────────
def load_font(size, bold=False):
    """Try system fonts; fall back to default."""
    candidates_bold = [
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/calibrib.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
    ]
    candidates_reg = [
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/calibri.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
    ]
    for path in (candidates_bold if bold else candidates_reg):
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                pass
    return ImageFont.load_default()

# ─────────────────────────────────────────────────────────────────────────────
#  LOGO  800 × 800
# ─────────────────────────────────────────────────────────────────────────────
def draw_logo():
    W, H = 800, 800
    img  = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    d    = ImageDraw.Draw(img)

    # ── icon: geometric bridge / upward arc ──────────────────────────────────
    cx, cy = W // 2, 300
    r_outer, r_inner = 155, 105
    lw = 18

    # outer arc (top half of circle = bridge arch)
    bbox_o = [cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer]
    d.arc(bbox_o, start=200, end=340, fill=BLUE, width=lw)

    # inner arc
    bbox_i = [cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner]
    d.arc(bbox_i, start=200, end=340, fill=SKY, width=lw)

    # left pillar
    def arc_point(cx, cy, r, deg):
        rad = math.radians(deg)
        return cx + r * math.cos(rad), cy + r * math.sin(rad)

    lx_o, ly_o = arc_point(cx, cy, r_outer, 200)
    lx_i, ly_i = arc_point(cx, cy, r_inner, 200)
    rx_o, ry_o = arc_point(cx, cy, r_outer, 340)
    rx_i, ry_i = arc_point(cx, cy, r_inner, 340)

    base_y = cy + 155

    # pillars
    d.line([(lx_o, ly_o), (lx_o, base_y)], fill=NAVY, width=lw)
    d.line([(rx_o, ry_o), (rx_o, base_y)], fill=NAVY, width=lw)

    # road deck (horizontal bar)
    d.line([(lx_o - 8, base_y), (rx_o + 8, base_y)], fill=NAVY, width=lw)

    # upward arrow hint — small triangle above arch apex
    apex_x, apex_y = cx, cy - r_outer - 8
    arr = 22
    d.polygon([
        (apex_x,       apex_y - arr),
        (apex_x - arr, apex_y + 4),
        (apex_x + arr, apex_y + 4),
    ], fill=SKY)

    # ── wordmark ─────────────────────────────────────────────────────────────
    f_bold = load_font(82, bold=True)
    f_reg  = load_font(82, bold=False)
    f_tag  = load_font(22)

    word1, word2 = "Career", "Bridge"

    # measure
    bb1 = d.textbbox((0, 0), word1, font=f_bold)
    bb2 = d.textbbox((0, 0), word2, font=f_bold)
    w1  = bb1[2] - bb1[0]
    w2  = bb2[2] - bb2[0]
    gap = 0
    total_w = w1 + gap + w2
    tx = (W - total_w) // 2
    ty = base_y + 36

    d.text((tx,          ty), word1, font=f_bold, fill=NAVY)
    d.text((tx + w1 + gap, ty), word2, font=f_bold, fill=BLUE)

    # tagline
    tag = "Votre passerelle  ·  مسيرتك  ·  Your path"
    tb  = d.textbbox((0, 0), tag, font=f_tag)
    tw  = tb[2] - tb[0]
    d.text(((W - tw) // 2, ty + 96), tag, font=f_tag, fill=GREY)

    out = os.path.join(OUT_DIR, "careerbridge-logo.png")
    img.save(out, "PNG")
    print("Logo saved: " + out)
    return out


# ─────────────────────────────────────────────────────────────────────────────
#  LINKEDIN BANNER  1584 × 396
# ─────────────────────────────────────────────────────────────────────────────
def draw_banner():
    W, H = 1584, 396
    img  = Image.new("RGB", (W, H), NAVY)
    d    = ImageDraw.Draw(img)

    # ── gradient background (manual column strips) ───────────────────────────
    for x in range(W):
        t = x / W                          # 0 → 1
        r = int(NAVY[0] + (BLUE[0] - NAVY[0]) * t)
        g = int(NAVY[1] + (BLUE[1] - NAVY[1]) * t)
        b = int(NAVY[2] + (BLUE[2] - NAVY[2]) * t)
        d.line([(x, 0), (x, H)], fill=(r, g, b))

    # ── subtle bridge arc (thin white lines) ─────────────────────────────────
    cx, cy = W // 2, H + 60
    for r, alpha in [(520, 30), (440, 22), (360, 15)]:
        # draw arc as polyline segments
        pts = []
        for deg in range(200, 341):
            rad = math.radians(deg)
            px  = cx + r * math.cos(rad)
            py  = cy + r * math.sin(rad)
            pts.append((px, py))
        # draw with varying alpha via thin lines
        for i in range(len(pts) - 1):
            d.line([pts[i], pts[i+1]], fill=(*WHITE, alpha), width=2)

    # vertical pillars subtle
    d.line([(W//2 - 520, H - 40), (W//2 - 520, H)], fill=(*WHITE, 20), width=2)
    d.line([(W//2 + 520, H - 40), (W//2 + 520, H)], fill=(*WHITE, 20), width=2)

    # ── left block: brand name + tagline ─────────────────────────────────────
    f_brand_bold = load_font(88, bold=True)
    f_brand_reg  = load_font(88, bold=False)
    f_tag        = load_font(26)
    f_small      = load_font(20)
    f_pill       = load_font(21)

    word1, word2 = "Career", "Bridge"
    bb1 = d.textbbox((0, 0), word1, font=f_brand_bold)
    bb2 = d.textbbox((0, 0), word2, font=f_brand_bold)
    w1  = bb1[2] - bb1[0]
    w2  = bb2[2] - bb2[0]

    lx, ly = 72, 100
    d.text((lx,      ly), word1, font=f_brand_bold, fill=WHITE)
    d.text((lx + w1, ly), word2, font=f_brand_bold, fill=SKY)

    tagline = "Votre passerelle vers une carrière internationale"
    d.text((lx, ly + 104), tagline, font=f_tag, fill=(*WHITE, 210))

    # service pills bottom-left
    services = ["LinkedIn", "CV & Carrière", "Études à l'étranger"]
    pill_x = lx
    pill_y = H - 68
    pill_pad_x, pill_pad_y = 14, 7
    for svc in services:
        tb   = d.textbbox((0, 0), svc, font=f_pill)
        tw   = tb[2] - tb[0]
        th   = tb[3] - tb[1]
        pw   = tw + pill_pad_x * 2
        ph   = th + pill_pad_y * 2
        # semi-transparent pill
        pill = Image.new("RGBA", (pw, ph), (255, 255, 255, 45))
        pd   = ImageDraw.Draw(pill)
        pd.rounded_rectangle([(0, 0), (pw - 1, ph - 1)], radius=ph // 2,
                              fill=(255, 255, 255, 45))
        img.paste(pill, (pill_x, pill_y), pill)
        d.text((pill_x + pill_pad_x, pill_y + pill_pad_y), svc,
               font=f_pill, fill=WHITE)
        pill_x += pw + 10

    # ── right block: destination pills ───────────────────────────────────────
    f_dest = load_font(26, bold=True)
    destinations = ["🇩🇪  Allemagne", "🇫🇷  France", "🇬🇧  UK"]
    dp_w, dp_h = 190, 50
    dp_x = W - dp_w - 72
    dp_y = 80
    for dest in destinations:
        pill = Image.new("RGBA", (dp_w, dp_h), (255, 255, 255, 50))
        pd   = ImageDraw.Draw(pill)
        pd.rounded_rectangle([(0, 0), (dp_w - 1, dp_h - 1)],
                              radius=dp_h // 2, fill=(255, 255, 255, 50))
        img.paste(pill, (dp_x, dp_y), pill)
        # text without emoji for font compatibility
        label = dest.split("  ", 1)[-1]
        tb = d.textbbox((0, 0), label, font=f_dest)
        tw = tb[2] - tb[0]
        d.text((dp_x + (dp_w - tw) // 2, dp_y + 12), label,
               font=f_dest, fill=WHITE)
        dp_y += dp_h + 14

    # language note bottom-right
    langs = "Français  ·  العربية  ·  English"
    lb    = d.textbbox((0, 0), langs, font=f_small)
    lw    = lb[2] - lb[0]
    d.text((W - lw - 72, H - 46), langs, font=f_small,
           fill=(*WHITE, 140))

    out = os.path.join(OUT_DIR, "linkedin-banner.png")
    img.save(out, "PNG")
    print("Banner saved: " + out)
    return out


if __name__ == "__main__":
    draw_logo()
    draw_banner()
    print("\nDone. Files are in career-app/public/")
