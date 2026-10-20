"""生成 All-Search 插件图标（蓝底 + 白色放大镜）。
用法：python make-icons.py <输出目录>
"""
import sys
import os
from PIL import Image, ImageDraw

BRAND = (24, 144, 255, 255)   # #1890ff
WHITE = (255, 255, 255, 255)
SS = 8                        # 超采样倍数
SIZES = [16, 32, 48, 96, 128]


def draw(size: int) -> Image.Image:
    s = size * SS
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # 圆角底
    d.rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * 0.22), fill=BRAND)

    # 放大镜镜圈
    cx, cy, r = s * 0.44, s * 0.42, s * 0.255
    stroke = max(SS * 2, int(s * 0.085))
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=WHITE, width=stroke)

    # 手柄（圆头）
    x1, y1 = cx + r * 0.72, cy + r * 0.72
    x2, y2 = cx + r * 1.52, cy + r * 1.52
    handle = max(SS * 2, int(s * 0.095))
    d.line([x1, y1, x2, y2], fill=WHITE, width=handle)
    for (x, y) in ((x1, y1), (x2, y2)):
        d.ellipse([x - handle / 2, y - handle / 2, x + handle / 2, y + handle / 2], fill=WHITE)

    return img.resize((size, size), Image.LANCZOS)


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "."
    os.makedirs(out, exist_ok=True)
    for size in SIZES:
        path = os.path.join(out, f"{size}.png")
        draw(size).save(path, "PNG", optimize=True)
        print("wrote", path)


if __name__ == "__main__":
    main()
