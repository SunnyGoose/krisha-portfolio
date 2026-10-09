"""Run: python3 scripts/check-intro-gifs.py (requires Pillow)."""
from pathlib import Path
from PIL import Image

assets = Path(__file__).resolve().parents[1] / 'public'
for filename, expected_frames in [('intro-walk.gif', 2), ('intro-fly.gif', 8), ('about-walk.gif', 2), ('about-hello.gif', 8)]:
    with Image.open(assets / filename) as animation:
        assert animation.n_frames == expected_frames, filename
        if filename == 'about-hello.gif':
            assert 'loop' not in animation.info, 'Hello must play once and hold its final frame'
        for frame in range(animation.n_frames):
            animation.seek(frame)
            rgba = animation.convert('RGBA')
            assert rgba.getpixel((0, 0))[3] == 0, f'{filename}: opaque background in frame {frame}'
            assert rgba.getchannel('A').getextrema() == (0, 255), f'{filename}: missing transparency or artwork in frame {frame}'
print('Every intro GIF frame retains transparent backgrounds and visible artwork.')
