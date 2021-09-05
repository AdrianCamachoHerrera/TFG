from bson.objectid import ObjectId
from bson.json_util import dumps
from pymongo import MongoClient
import os
import json

# GET friends from an user
# request json: {"user": "userid"}
def handle(req):

    reqjson = json.loads(req)
    userid = reqjson['user']

    myclient = MongoClient('mongodb://' + os.environ['mongo'] + ':27017/')
    mydb = myclient['dev']
    usercol = mydb['user']

    user = usercol.find_one({'_id': ObjectId(userid)})
    friendids = user['friends']

    resultlist = []
    for friendid in friendids:
       friend = usercol.find_one({'_id': ObjectId(friendid)})
       resultitem = {'userid': str(friend['_id']), 'username': friend['username'], 'name': friend['name']}
       resultlist.append(resultitem)

    return json.dumps(resultlist)
# return json: [{"userid": "friendid", "username": "friendusername", "name": "friendname"}]
