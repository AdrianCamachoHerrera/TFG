from flask import Flask, request, make_response
from waitress import serve
import numpy as np
import cv2


app = Flask(__name__)

# distutils.util.strtobool() can throw an exception
def is_true(val):
    return len(val) > 0 and val.lower() == "true" or val == "1"

@app.before_request
def fix_transfer_encoding():
    """
    Sets the "wsgi.input_terminated" environment flag, thus enabling
    Werkzeug to pass chunked requests as streams.  The gunicorn server
    should set this, but it's not yet been implemented.
    """

    transfer_encoding = request.headers.get("Transfer-Encoding", None)
    if transfer_encoding == u"chunked":
        request.environ["wsgi.input_terminated"] = True

@app.route("/", defaults={"path": ""}, methods=["POST", "GET"])
def home(path):
    return "home"

@app.route("/bwimage", methods=["POST", "GET"])
def bwimage():
     #read image file string data
    filestr = request.files['file'].read()
    #convert string data to numpy array
    npimg = np.frombuffer(filestr, np.uint8)
    # convert numpy array to image
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    grayImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (thresh, blackAndWhiteImage) = cv2.threshold(grayImage, 127, 255, cv2.THRESH_BINARY)
    
    retval, buffer = cv2.imencode('.jpg', blackAndWhiteImage)
    response = make_response(buffer.tobytes())
    return response

@app.route("/gsimage", methods=["POST", "GET"])
def gsimage():
     #read image file string data
    filestr = request.files['file'].read()
    #convert string data to numpy array
    npimg = np.frombuffer(filestr, np.uint8)
    # convert numpy array to image
    img = cv2.imdecode(npimg, cv2.IMREAD_UNCHANGED)
    grayImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    retval, buffer = cv2.imencode('.jpg', grayImage)
    response = make_response(buffer.tobytes())
    return response

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=5000)