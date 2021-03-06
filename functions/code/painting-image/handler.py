from PIL import Image, ImageFilter
from flask import make_response
import io

# Aplies a painting effect to an image
def handle(req):

    im = Image.open(io.BytesIO(req))
    im = im.filter(ImageFilter.ModeFilter(size=9))
    img_byte_arr = io.BytesIO()
    im.save(img_byte_arr, format='JPEG')

    response = make_response(img_byte_arr.getvalue())
    response.headers.set('Content-Type', 'image/jpeg')
    response.headers.set(
        'Content-Disposition', 'attachment', filename='image.jpg')
    return response
