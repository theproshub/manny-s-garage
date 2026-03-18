#!/usr/bin/env python3
"""Remove black background from logo.png, making it transparent."""
from pathlib import Path

from PIL import Image

LOGO = Path(__file__).resolve().parent.parent / "public" / "logo.png"
# Only make pure black transparent so dark grey tagline stays visible
BLACK_THRESHOLD = 15  # R, G, B all below this → transparent


def main():
    img = Image.open(LOGO).convert("RGBA")
    data = list(img.getdata())
    new_data = []
    for item in data:
        r, g, b, a = item
        if r <= BLACK_THRESHOLD and g <= BLACK_THRESHOLD and b <= BLACK_THRESHOLD:
            new_data.append((r, g, b, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    img.save(LOGO, "PNG")
    print("Saved:", LOGO)


if __name__ == "__main__":
    main()
