# -*- coding: utf-8 -*-
"""生成孟菲斯风格的「淋雨家的工作台」应用图标（.ico 多尺寸 + .png 预览）。
用法：python make_icon.py <输出目录>
设计语言：DESIGN.md（Memphis）—— 暗底 + 荧光四色 + 2px 硬边 + 硬投影 + 旋转几何。
"""
import math
import os
import sys

from PIL import Image, ImageDraw, ImageFont

INK = (14, 12, 16)
BONE = (247, 242, 231)
LIME = (200, 255, 0)
MAGENTA = (255, 46, 154)
CYAN = (0, 232, 255)
AMBER = (255, 138, 0)

ARIBLK = r"C:\Windows\Fonts\ariblk.ttf"


def rotated_square(cx, cy, half, deg):
    a = math.radians(deg)
    pts = []
    for sx, sy in ((-1, -1), (1, -1), (1, 1), (-1, 1)):
        x = cx + (sx * half) * math.cos(a) - (sy * half) * math.sin(a)
        y = cy + (sx * half) * math.sin(a) + (sy * half) * math.cos(a)
        pts.append((x, y))
    return pts


def draw_icon(scale):
    """在 scale x scale 的画布上按比例画；所有坐标都用比例，保证各尺寸一致。"""
    S = scale
    img = Image.new("RGB", (S, S), INK)
    d = ImageDraw.Draw(img)
    u = S / 100.0  # 百分比单位

    # 外框：骨白硬边（小尺寸也要看得见）
    bw = max(2, round(S * 0.045))
    d.rectangle([0, 0, S - 1, S - 1], outline=BONE, width=bw)

    # 青柠方块（旋转 -6°）+ ink 描边
    sq = rotated_square(47 * u, 53 * u, 27 * u, -6)
    d.polygon(sq, fill=LIME)
    d.line(sq + [sq[0]], fill=INK, width=max(2, round(S * 0.012)), joint="curve")

    # 洋红圆：右上角，压在方块一角上（硬边）
    r = 13 * u
    d.ellipse([80 * u - r, 19 * u - r, 80 * u + r, 19 * u + r], fill=MAGENTA)
    d.ellipse([80 * u - r, 19 * u - r, 80 * u + r, 19 * u + r],
              outline=INK, width=max(2, round(S * 0.012)))

    # 青三角：左下角
    tri = [(11 * u, 89 * u), (31 * u, 89 * u), (21 * u, 69 * u)]
    d.polygon(tri, fill=CYAN)
    d.line(tri + [tri[0]], fill=INK, width=max(2, round(S * 0.012)), joint="curve")

    # 骨白点阵：右下角 3×3（大尺寸才画，小尺寸会糊成一团）
    if S >= 48:
        dr = max(1.0, S * 0.008)
        for gx in range(3):
            for gy in range(3):
                cx, cy = (68 + gx * 7) * u, (76 + gy * 7) * u
                d.ellipse([cx - dr, cy - dr, cx + dr, cy + dr], fill=BONE)

    # 字母 W：ink + 洋红硬投影
    if os.path.exists(ARIBLK):
        fs = int(S * 0.46)
        font = ImageFont.truetype(ARIBLK, fs)
        txt = "W"
        bbox = d.textbbox((0, 0), txt, font=font)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
        tx = 47 * u - tw / 2 - bbox[0]
        ty = 53 * u - th / 2 - bbox[1] + S * 0.005
        off = max(2, round(S * 0.022))
        d.text((tx + off, ty + off), txt, font=font, fill=MAGENTA)
        d.text((tx, ty), txt, font=font, fill=INK)
    return img


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "."
    os.makedirs(out, exist_ok=True)

    # .ico：多尺寸，每档独立渲染（小尺寸不放大糊掉）
    sizes = [16, 24, 32, 48, 64, 128, 256]
    imgs = [draw_icon(s) for s in sizes]
    ico_path = os.path.join(out, "工作台-孟菲斯.ico")
    imgs[-1].save(ico_path, format="ICO", sizes=[(s, s) for s in sizes], append_images=imgs[:-1])

    # 预览图（文档/分享用）
    big = draw_icon(512)
    big.save(os.path.join(out, "工作台-孟菲斯-512.png"), format="PNG")
    # 各档预览拼一张，方便一眼看小尺寸是否可读
    sheet = Image.new("RGB", (16 + 24 + 32 + 48 + 64 + 128 + 7 * 12, 140), (240, 240, 240))
    x = 10
    for s in sizes[:-1]:
        im = draw_icon(s)
        sheet.paste(im, (x, 10))
        x += s + 12
    sheet.save(os.path.join(out, "尺寸预览.png"), format="PNG")
    print("written:", ico_path)
    print("sizes:", sizes)


if __name__ == "__main__":
    main()
