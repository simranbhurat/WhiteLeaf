import psycopg2
from psycopg2 import sql
from flask import Flask, Response, jsonify, request, json
from flask_cors import CORS
import requests

POSTGRES_USER = "postgres"
POSTGRES_PASSWD = "leaf8970"
POSTGRES_DB = "whiteleaf"
POSTGRES_HOST = "database-1.cb9duvz2eiil.us-east-2.rds.amazonaws.com"
connection = 1

# Creating a flask instance
app = Flask(__name__) 
CORS(app)

# Create user API 
@app.route('/api/v1/user/create', methods=['PUT'])
def create_user():
    if request.method == 'PUT':
        req_data = request.get_json()
        
        name = '{}'.format(req_data.get("name"))
        passwd = '{}'.format(req_data.get("password"))
        email = '{}'.format(req_data.get("email"))
        phone = req_data.get("phone")
        location = '{}'.format(req_data.get("location"))
        r0 = requests.post(
            url="http://3.129.56.173:6000/api/v1/db/read",
            json={
                "table":"users",
                "columns":["email_id"]
            }
        )
        # tere bhai ne color change karke bheja rukh dekhegey sirf first 4 pages change kiya hai usne
        # do you know any UI designer? they'll know proper colors nope nahi pataa
        result = r0.json()
        listOfExistingUsers = result["email_id"]

        if email in listOfExistingUsers:
            result = {}
            result["status"] = 401
            result["error"] = "User already exists"
            return json.dumps(result)
            
        else:
            r1 = requests.post(
                url="http://3.129.56.173:6000/api/v1/db/write",
                json={
                    "insert":{
                        "user_name":name,
                        "email_id":email,
                        "user_password":passwd,
                        "ph_no":phone,
                        "user_location":location
                    },
                    "table":"users",
                    "update": "0",
                    "delete": "0",
                    "write" : "1"
                }
            )
            # Get the response of the above request
            result = r1.json()
            status_code = result["status"]
            
            if(status_code==401):
                return Response(status=401) 
            else:
                return Response(status=201)

@app.route("/api/v1/subcat/create", method =['PUT'])
def create_subcat():
    if request.method == 'PUT':
        req_data = request.get_json()
        sub_category_name = '{}'.format(req_data.get("sub_category_name"))
@app.route("/api/v1/maincat/create", methods=['PUT'])
def create_maincat():
    if request.method == 'PUT':
        req_data = request.get_json()
        categoryList = req_data.get("categories")
        for i in categoryList:
            category_name = '{}'.format(i)
             r0 = request.post(
            url="http://3.129.56.173:6000/api/v1/db/read"
            json={
                "table":"main_categories",
                "insert"
            }
        )
# Add retailer
@app.route("/api/v1/retailer/create", methods=['PUT'])
def create_retailer():

    # soo before a creating a user, we need to check if a user already exists right?
    # so before writing to the DB, we need to read the list of users from the DB and check if the 
    # user already exists ok?yaaa see neeche what wa primary key?email ok 

    if request.method == 'PUT':
        req_data = request.get_json() 
        registered = '{}'.format(req_data.get("registered"))
        number = '{}'.format(req_data.get("number"))
        name = '{}'.format(req_data.get("name"))
        pnumber = '{}'.format(req_data.get("pnumber"))
        mail = '{}'.format(req_data.get("mail"))
        state = '{}'.format(req_data.get("state"))
        city = '{}'.format(req_data.get("city"))
        password = '{}'.format(req_data.get("password"))
        address1 = '{}'.format(req_data.get("address1"))
        address2 = '{}'.format(req_data.get("address2"))
        location = '{}'.format(req_data.get("location"))
#        time = '{}'.format(req_data.get("time"))

        # {
        # "table" : <table_name>,
        # "columns" : ["<col_name>", ...],
        # "where" : "["<col_name = 'value'>", ...]
        # }
        r0 = requests.post(
            url="http://3.129.56.173:6000/api/v1/db/read",
            json={
                "table":"users",
                "columns":["email_id"],
                "where":[]
            }
        )
        result = r0.json()
        listOfExistingUsers = []
        if result["count"]!=0:
          listOfExistingUsers = result["email_id"] 

        if mail in listOfExistingUsers:
            result = {}
            result["status"] = 401
            result["error"] = "User already exists"
            return json.dumps(result)
        
        else:
            r1 = requests.post(
                url="http://3.129.56.173:6000/api/v1/db/write",
                json={
                    "insert":{
                        "registered":registered,
                        "registration_no":number,
                        "company_name":name,
                        "ph_no":pnumber,
                        "email_id":mail,
                        "ste":state,
                        "city":city,
                        "pwd":password,
                        "address1":address1,
                        "address2":address2,
                        "lct":location,
                    },
                    "table":"retailers",
                    "update": "0",
                    "delete": "0",
                    "write" : "1"
                }
            )
            # Get the response of the above request
            result = r1.json()
            status_code = result["status"]
            
            if(status_code==401):
                return Response(status=401) 
            else:
                return Response(status=201)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
