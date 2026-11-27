"""
把 AI 繪圖的米色紙底校正成白色、縮圖、轉 WebP，輸出到 public/img/forest/。
網頁上用 mix-blend-mode: multiply 疊在牛皮紙底上；不去背，角色不會被誤切。

用法（需要 Python 3、numpy、Pillow）：
    python3 scripts/prepare-art.py <原圖資料夾> public/img/forest
投影插圖（每張都裁到主體）：
    python3 scripts/prepare-art.py <原圖資料夾> public/img/forest/s1 --trim
原圖資料夾裡放 hero.png、bear.png、rabbit.png、dog.png、bear-wave.png、dog-wave.png、
course-01.png ～ course-04.png（檔名對照見 DESIGN.md）。
"""
import sys, os
import numpy as np
from PIL import Image

def whiten(src, dst, max_side, crop=None, trim=False):
    im = Image.open(src).convert("RGB")
    if crop: im = im.crop(crop)
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32)
    border = np.concatenate([a[:8].reshape(-1, 3), a[-8:].reshape(-1, 3), a[:, :8].reshape(-1, 3), a[:, -8:].reshape(-1, 3)])
    bg = np.percentile(border, 60, axis=0)
    out = np.clip(a / bg * 255.0, 0, 255)
    # 接近紙色的地方推成純白（紙紋、淡淡的暗角），主體顏色不動
    lo = out.min(axis=2, keepdims=True)
    k = np.clip((lo - 215.0) / 30.0, 0, 1)
    out = out * (1 - k) + 255.0 * k
    # 四邊再羽化到白色，避免看到方框
    h, w = lo.shape[:2]
    fx = np.minimum(np.arange(w), np.arange(w)[::-1]) / (w * 0.06)
    fy = np.minimum(np.arange(h), np.arange(h)[::-1]) / (h * 0.06)
    edge = np.clip(np.minimum(fy[:, None], fx[None, :]), 0, 1)[..., None]
    out = out * edge + 255.0 * (1 - edge)
    out = np.clip(out, 0, 255).astype(np.uint8)
    img = Image.fromarray(out)
    if trim:
        # 裁到主體：找出不是白色的範圍，四周留 5% 白邊
        ink = (out.min(axis=2) < 236).astype(np.uint8) * 255
        bb = Image.fromarray(ink, "L").getbbox()
        if bb:
            pw, ph = int((bb[2] - bb[0]) * 0.05) + 8, int((bb[3] - bb[1]) * 0.05) + 8
            img = img.crop((max(0, bb[0] - pw), max(0, bb[1] - ph), min(w, bb[2] + pw), min(h, bb[3] + ph)))
    img.save(dst, "WEBP", quality=84, method=6)
    return img.size, os.path.getsize(dst) // 1024, bg.round()

if __name__ == "__main__":
    s, o = sys.argv[1], sys.argv[2]
    os.makedirs(o, exist_ok=True)
    if "--trim" in sys.argv:
        # 投影用插圖：資料夾裡每一張 PNG 都校正、裁到主體、長邊縮到 1400px
        for name in sorted(os.listdir(s)):
            if name.lower().endswith(".png"):
                stem = os.path.splitext(name)[0]
                print(stem, whiten(os.path.join(s, name), os.path.join(o, stem + ".webp"), 1400, trim=True))
        sys.exit(0)
    jobs = {
        "hero": (1800, (0, 300, 2048, 1536)),
        "bear": (720, None), "rabbit": (720, None), "dog": (720, None),
        "bear-wave": (640, None), "dog-wave": (480, None),
        "course-01": (760, None), "course-02": (760, None), "course-03": (760, None), "course-04": (900, None),
    }
    for n, (side, crop) in jobs.items():
        print(n, whiten(os.path.join(s, n + ".png"), os.path.join(o, n + ".webp"), side, crop))
