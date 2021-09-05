from flask import make_response
import numpy as np
import cv2

#Invert image
def handle(req):

    #convert string data to numpy array
    npimg = np.frombuffer(req, np.uint8)
    # convert numpy array to image
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)

    invertedImage = cv2.bitwise_not(img)
    
    retval, buffer = cv2.imencode('.jpg', invertedImage)
    response = make_response(buffer.tobytes())
    return response
    