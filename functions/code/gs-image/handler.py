from flask import make_response
import numpy as np
import cv2

#Gray Scale image
def handle(req):

    #convert string data to numpy array
    npimg = np.frombuffer(req, np.uint8)
    # convert numpy array to image
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    grayImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    retval, buffer = cv2.imencode('.jpg', grayImage)
    response = make_response(buffer.tobytes())
    response.headers.set('Content-Type', 'image/jpeg')
    response.headers.set(
    'Content-Disposition', 'attachment', filename='image.jpg')
    return response