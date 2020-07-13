import psycopg2
from psycopg2 import sql
from flask import Flask, Response, jsonify, request

POSTGRES_USER = "postgres"
POSTGRES_PASSWD = "leaf8970"
POSTGRES_DB = "whiteleaf"
POSTGRES_HOST = "database-1.cb9duvz2eiil.us-east-2.rds.amazonaws.com"
connection = 1

app = Flask(__name__)

@app.route('/api/v1/user/create', methods=['PUT'])
def create_user():
    if request.method == 'PUT':
        req_data = request.get_json()
        name = '{}'.format(req_data.get("name"))
        passwd = '{}'.format(req_data.get("password"))
        email = '{}'.format(req_data.get("email"))
        phone = req_data.get("phone")
        location = '{}'.format(req_data.get("location"))
        # name = '{}'.format(name)
        # passwd = '{}'.format(passwd)
        # email = '{}'.format(email)
        # location = '{}'.format(location)

        insertVal = "'" + name + "'" +", " +"'" + email + "'" +", " + str(phone) + ", " +"'" + passwd +"'" + ", " +"'" + location +"'" 
        try:
            connection = psycopg2.connect(user=POSTGRES_USER,
                                            password=POSTGRES_PASSWD,
                                            host=POSTGRES_HOST,
                                            port="5432",
                                            database=POSTGRES_DB)
            print("connected")
            query = sql.SQL("INSERT" +
                                " INTO users" + "(name,email_id,ph_no,password,location)" +
                                " VALUES " + "(" + insertVal +");"
                                )
            print(query)
            cursor = connection.cursor()
            cursor.execute(query.as_string(connection))
            connection.commit()

        except Exception as err:
            print(err)
        finally:
            if connection:
                connection.close()
                return Response(status=200)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
