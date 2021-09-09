from pymongo import MongoClient
import json
import datetime
import os

# POST a comment to an image
# request json: {"text": "text", "author": "userid", "image": "imageid"}
def handle(req):

    myclient = MongoClient('mongodb://' + os.environ['mongo'] + ':27017/')
    mydb = myclient['dev']
    mycol = mydb['comment']

    reqjson = json.loads(req)
    text = reqjson['text']
    author = reqjson['author']
    image = reqjson['image']

    mydict = { 'text': text, 'author': author, 'image': image, 'date': datetime.datetime.utcnow()}
    
    return mycol.insert_one(mydict).inserted_id
# return comment id