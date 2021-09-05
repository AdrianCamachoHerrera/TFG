from PIL import Image
from flask import make_response
import io

def isLandscape(width, height):
    return ((width - height) > 0)

def trim_to_sq(im):
        width, height = im.size

        if isLandscape(width, height) == True:
            offset = (width-height)/2
            (left, upper, right, lower) = (offset, 0, offset+height, height)
        else:
            offset = (height-width)/2
            (left, upper, right, lower) = (0, offset, width, offset + width)

        im_crop = im.crop((left, upper, right, lower))
        im_crop = im_crop.resize((1080, 1080), Image.ANTIALIAS)
        return im_crop

# Prepares an image to be uploaded to the app, crops the image to an square, resizes it to 1080x1080 and makes it jpg
def handle(req):

    im = Image.open(io.BytesIO(req))
    im = trim_to_sq(im)
    img_byte_arr = io.BytesIO()
    im = im.convert('RGB')
    im.save(img_byte_arr, format='JPEG', optimize=True, quality=95)
    return make_response(img_byte_arr.getvalue())