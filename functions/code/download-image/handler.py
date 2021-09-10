from bson.objectid import ObjectId
from pymongo import MongoClient
from flask import make_response
import json
import os

# GET returns an image from and imageid
# request path variable image = imageid
def handle(req):

    myclient = MongoClient('mongodb://' + os.environ['mongo'] + ':27017/')
    mydb = myclient['dev']
    imagecol = mydb['image']

    imagecursor = imagecol.find_one({'_id': ObjectId(req)})
    image = imagecursor['image']

    response = make_response(image)
    response.headers.set('Content-Type', 'image/jpeg')
    response.headers.set(
        'Content-Disposition', 'attachment', filename='image.jpg')
    return response