from bson.objectid import ObjectId
from bson.json_util import dumps
from pymongo import MongoClient
import os

def insert():

    myclient = MongoClient('mongodb://' + os.environ['mongo'] + ':27017/')
    mydb = myclient['dev']
    mycol = mydb['image']

    mydict = { "author": "author", "description": "description", "rateSum": 0, "rateCount": 0, "comments": [], "_clas": "com.adrian.tfg.images.model.Image"}
    
    return mycol.insert_one(mydict).inserted_id

print(insert())
