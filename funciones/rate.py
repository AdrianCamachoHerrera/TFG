from bson.objectid import ObjectId
from bson.json_util import dumps
from pymongo import MongoClient
import os

def rate(imageid, rate):

    myclient = MongoClient('mongodb://' + os.environ['mongo'] + ':27017/')
    mydb = myclient['dev']
    mycol = mydb['image']

    res = mycol.find_one({'_id': ObjectId(imageid)})

    rateSum = res['rateSum'] + rate
    rateCount = res['rateCount'] + 1
    print(res['_id'])

    mycol.update_one({'_id': ObjectId(imageid)},{"$set" : {"rateSum" : rateSum}})
    mycol.update_one({'_id': ObjectId(imageid)},{"$set" : {"rateCount" : rateCount}})

rate("612b698c57245e04abe078aa", 2)
