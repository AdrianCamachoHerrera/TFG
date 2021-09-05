from bson.objectid import ObjectId
from bson.json_util import dumps
from pymongo import MongoClient
import os
import json

# POST rates an image
# request json: {"image": "imageid", "rate": rate}
def handle(req):

    reqjson = json.loads(req)
    imageid = reqjson['image']
    rate = reqjson['rate']

    myclient = MongoClient('mongodb://' + os.environ['mongo'] + ':27017/')
    mydb = myclient['dev']
    mycol = mydb['image']

    res = mycol.find_one({'_id': ObjectId(imageid)})

    rateSum = res['rateSum'] + rate
    rateCount = res['rateCount'] + 1

    mycol.update_one({'_id': ObjectId(imageid)},{'$set' : {'rateSum' : rateSum}})
    mycol.update_one({'_id': ObjectId(imageid)},{'$set' : {'rateCount' : rateCount}})

    resultRate = rateSum/rateCount
    return json.loads('{"rate": ' + str(resultRate) + ' }')
    # return json: {"rate": newAverageRate}