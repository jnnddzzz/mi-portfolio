"""Descarga las imágenes externas de los emails para servirlas desde la propia web.

Se ejecuta al publicar (GitHub Actions). Si una imagen no se puede descargar,
se deja el enlace original para que el navegador la cargue directamente.
"""
import hashlib
import pathlib
import re
import urllib.request

CARPETA = pathlib.Path(__file__).resolve().parent.parent / "assets/trabajos/emails"
DESTINO = CARPETA / "img"
PATRON = re.compile(r"""(?:src="|url\(')(https?://[^"')]+\.(?:jpe?g|png|gif|webp)[^"')]*)""", re.I)


def descargar(url):
    ext = re.search(r"\.(jpe?g|png|gif|webp)", url, re.I).group(1).lower()
    nombre = hashlib.sha1(url.encode()).hexdigest()[:16] + "." + ext
    archivo = DESTINO / nombre
    if not archivo.exists():
        peticion = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(peticion, timeout=30) as r:
            if not r.headers.get("Content-Type", "").startswith("image/"):
                raise ValueError("no es una imagen")
            archivo.write_bytes(r.read())
    return "img/" + nombre


DESTINO.mkdir(exist_ok=True)
for html in CARPETA.glob("*.html"):
    texto = html.read_text(encoding="utf-8")
    for url in sorted(set(PATRON.findall(texto))):
        try:
            local = descargar(url)
        except Exception as e:
            print(f"✗ {url} ({e})")
            continue
        texto = texto.replace(url, local)
        print(f"✓ {url} → {local}")
    html.write_text(texto, encoding="utf-8")
