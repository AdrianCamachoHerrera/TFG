from PIL import Image, ImageFilter
from flask import make_response
import io

# Aplies a painting effect to an image
def handle(req):

    im = Image.open(io.BytesIO(req))
    im = im.filter(ImageFilter.ModeFilter(size=9))
    img_byte_arr = io.BytesIO()
    im.save(img_byte_arr, format='JPEG')

    return make_response(img_byte_arr.getvalue())