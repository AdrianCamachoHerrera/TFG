from flask import make_response
import numpy as np
import cv2

# Black and White image
def handle(req):

    #convert string data to numpy array
    npimg = np.frombuffer(req, np.uint8)
    # convert numpy array to image
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    grayImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (thresh, blackAndWhiteImage) = cv2.threshold(grayImage, 127, 255, cv2.THRESH_BINARY)
    
    retval, buffer = cv2.imencode('.jpg', blackAndWhiteImage)
    response = make_response(buffer.tobytes())
    return response