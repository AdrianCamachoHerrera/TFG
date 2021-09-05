from bson.objectid import ObjectId
from bson.json_util import dumps
from pymongo import MongoClient
import os
import json

# GET Comments from an image
# request json: {"image": "imageid"}
def handle(req):

    reqjson = json.loads(req)
    imageid = reqjson['image']

    myclient = MongoClient('mongodb://' + os.environ['mongo'] + ':27017/')
    mydb = myclient['dev']
    usercol = mydb['user']
    commentcol = mydb['comment']

    comments = commentcol.find({'image': imageid}).sort('date', -1)

    resultlist = []
    for comment in comments:
       user = usercol.find_one({'_id': ObjectId(comment['author'])})
       resultitem = {'username': user['username'], 'text': comment['text'], 'date': comment['date'].strftime('%d/%m/%Y:%H:%M')}
       resultlist.append(resultitem)

    return json.dumps(resultlist)
# return json: [{"username": "username", "text": "text", "date": date}]