import psycopg2
from flask import Flask, jsonify, json, Response, request
from psycopg2 import sql

app = Flask(__name__)

POSTGRES_USER = "postgres"
POSTGRES_PASSWD = "leaf8970"
POSTGRES_DB = "whiteleaf"
POSTGRES_HOST = "database-1.cb9duvz2eiil.us-east-2.rds.amazonaws.com"


@app.errorhandler(405)
def method_not_allowed(error):
    return Response(status=405)


"""
DB write API, accepts POST, 405 for others 
"""
@app.route("/api/v1/db/write", methods=['POST'])
def writeToDB():
    """
        POST request data format - 
        {
            "insert" : {
                "col_name":"value
                .
                .
                .
            },
            "table" : "<table_name>",
            "update" : "boolean",
            "delete": "boolean",
            "write": "boolean",
            "where": "["<col_name = 'value'>" , ...]
        }
    """
    if(request.method == "POST"):
        req_data = request.get_json()

        table = req_data.get("table")   # get table name
        update = req_data.get("update")
        delete = req_data.get("delete")
        write = req_data.get("write")
        insert = req_data.get("insert")

        if write == "1":
            columnNames = insert.keys()
            columnValues = insert.values()

            insertColumns = ""
            insertValues = ""

            for i in columnNames:
                insertColumns += i + ","

            insertColumns = insertColumns[0:-1]

            for i in columnValues:
                insertValues += "'{}'".format(str(i)) + ","

            insertValues = insertValues[0:-1]

            # Try connecting to the Database and execute the query!!
            try:
                connection = psycopg2.connect(user=POSTGRES_USER,
                                              password=POSTGRES_PASSWD,
                                              host=POSTGRES_HOST,
                                              port="5432",
                                              database=POSTGRES_DB)

                cursor = connection.cursor()

                query = sql.SQL("INSERT INTO " +
                                table + "(" + insertColumns + ")" +
                                " VALUES" + "(" + insertValues + ");")

                cursor.execute(query.as_string(connection))
                connection.cursor()
                count = cursor.rowcount

                if count != 0:                    # Successfully written to db
                    result = {}
                    result["status"] = 201
                    return json.dumps(result)
                else:                           # Unsuccessfull
                    result = {}
                    result["status"] = 401
                    return json.dumps(result)
            # Connection error
            except Exception as err:
                print(err)
                return Response(status=400)
            # Finally close the connection
            finally:
                if connection:
                    cursor.close()
                    connection.close()

        # DELETE FROM tablename WHERE [conditions]
        if delete == "1":
            where = req_data.get("where")

            where_clause = ""
            for i in where:
                where_clause += i + " AND "
            where_clause = where_clause[0:-5]

            try:
                connection = psycopg2.connect(user=POSTGRES_USER,
                                              password=POSTGRES_PASSWD,
                                              host=POSTGRES_HOST,
                                              port="5432",
                                              database=POSTGRES_DB)

                cursor = connection.cursor()

                query = sql.SQL(" DELETE FROM " + table +
                                " WHERE " + where_clause + ";")

                cursor.execute(query.as_string(connection))

                count = cursor.rowcount

                if count != 0:
                    result = {}
                    result["status"] = 201
                    return json.dumps(result)
                else:
                    result = {}
                    result["status"] = 401
                    return json.dumps(result)
            except Exception as err:
                print(err)
                return Response(status=400)
            # Finally close the connection
            finally:
                if connection:
                    cursor.close()
                    connection.close()

        if update == "1":

            where = req_data.get("where")

            where_clause = ""
            for i in where:
                where_clause += i + " AND "
            where_clause = where_clause[0:-5]

            set_clause = ""

            columnNames = insert.keys()
            columnValues = insert.values()

            for (i, j) in (columnNames, columnValues):
                set_clause += i + "=" + j + ","

            set_clause = set_clause[0:-1]

            try:
                connection = psycopg2.connect(user=POSTGRES_USER,
                                              password=POSTGRES_PASSWD,
                                              host=POSTGRES_HOST,
                                              port="5432",
                                              database=POSTGRES_DB)

                cursor = connection.cursor()

                if len(where_clause) != 0:
                    query = sql.SQL("UPDATE " + table +
                                    " SET " + set_clause +
                                    " WHERE " + where_clause + ";")
                else:
                    query = sql.SQL("UPDATE " + table +
                                    " SET " + set_clause + ";")

                cursor.execute(query.as_string(connection))

                count = cursor.rowcount

                if count != 0:
                    result = {}
                    result["status"] = 201
                    return json.dumps(result)
                else:
                    result = {}
                    result["status"] = 401
                    return json.dumps(result)
            except Exception as err:
                print(err)
                return Response(status=400)
            # Finally close the connection
            finally:
                if connection:
                    cursor.close()
                    connection.close()


@app.route("/api/v1/db/read", methods=['GET'])
def readFromDB():
    # So in read api, the "calling" API needs some response other than just the status code
    # like select(col1, col2, col3) from tablename where col1=val1, col2=val2...;

    # ok
    # so now we also decide a response format
    # [ "col1":[val1, val2, ..] , "col2": [val1, val2, ...]]
    """
    POST request data format - 
    {
        "table" : <table_name>,
        "columns" : ["<col_name>", ...],
        "where" : "["<col_name = 'value'>", ...]
    }

    Response format - 
    {
        "status" : <status_code>,
        "count" : <number_of_rows_selected>,
        "result" : ["<col_name>" : [row1, ...], ...]  
    }
    """

    if request.method == 'POST':
        req_data = request.get_json()

        table = req_data.get("table")
        columns = req_data.get("columns")
        where = req_data.get("where")

        select_clause = ""
        for i in columns:
            select_clause += i + ","
        select_clause = select_clause[0:-1]

        where_clause = ""
        for i in where:
            where_clause += i + " AND "
        where_clause = where_clause[0:-1]

        count = 0

        try:
            connection = psycopg2.connect(user=POSTGRES_USER,
                                          password=POSTGRES_PASSWD,
                                          host=POSTGRES_PASSWD,
                                          port="5432",
                                          database=POSTGRES_DB)

            cursor = connection.cursor()

            if len(select_clause) == 0:
                query = sql.SQL("SELECT * FROM " + table + ";")
            elif len(where_clause) != 0:
                query = sql.SQL("SELECT " + select_clause
                                + " FROM " + table
                                + " WHERE " + where_clause + ";")
            else:
                query = sql.SQL("SELECT " + select_clause
                                + " FROM " + table + ";")

            cursor.execute(query.as_string(connection))

            count = cursor.rowcount

            if count != 0:
                """
                The query result is non empty.
                Create a dictionary with key = <column_name> and
                corresponding value is an array of values returned
                by the query for that column.

                Return a JSON response along with the dictionary and the count.
                """
                reqNumberOfColumns = len(columns)

                colNameIndexMap = {}
                # it's empty na toh kesse map hoorahe hai saare columns
                # yes
                # to add a key to a dictionary, you have to do
                # dictName[ keyName ] = value
                # and it gets created yess
                # colNameIndexMap[desc[0]] = column , this will do
                # colNameIndexMap[ username ] = 0
                # colNameIndexMap[ email ] = 1
                # i was asking about the keyword.. shouldn't we use dictName[]? colNameIndexMap is the name of the dict
                # toh wohi poocha na ki inbuilt hai hahahah, noooooo it's a variable we created of type dict WTF okokokok
                # neeche aa ab

                column = 0
                # Basically indexing each column name to a unique index
                # desc[0] has the name of the column returned after executing the query ok
                # what does cursor.description do?
                # It's a "Column" object, with result of ONE column values in order
                # it's like [COL1result, COL2result]
                # each element is of type column, and desc[0] gives the column name

                # What we're trying to create here is
                # { "col1_name":0, "col2_name":1, "col3_name":2    } soo yeh wo hai.. a[1] == 1[a]? noo
                # colNameIndexMap is a MAPPING for column-name to index
                # it's a dictionary
                # it is inbuilt? oy python dict() nahi patta ?  pata hai

                for desc in cursor.description:
                    colNameIndexMap[desc[0]] = column
                    column += 1

                result = {}
                result["status"] = 200
                result["count"] = count

                # { "col1_name":0, "col2_name":1, "col3_name":2    } why are we making this because..

                for i in range(count):
                    # Fetch each row of the result
                    row = cursor.fetchone()
                    # fetches one row at a time
                    # each row will have all the clumns na yasss then?

                    # I'll create an example see
                    # name      password
                    # vishal    1234
                    # sim       5677
                    # deds      4234

                    # firstime row will be a list [vishal, 1234] ok?
                    # ['name':0, password:1]   this is the colNameIndexMap ? yess haa peace

                    # columns is an array of column name : ["name", "password"]

                    # soo columns[j] will give "name", colNameIndexMap["name"] will give 0, and row[0] will give vishal!

                    # then, row [  colNameIndexMap[ columns[j]   ]] okk each column once yup that will be stored in?

                    # result[ columns[j] ] will make it result[ "name" ] = [vishal]
                    # next time, result[columns[j]] will make it result["name"].append("sim")
                    # when is i becoming 1?
                    # ONLY the first iteration, initially there is no key called "name"\
                    # so you create a key called name and assign a list with the f irst value of the row
                    # ok? haa but append first iteration me nahi daalna?
                    # initially, result = {}

                    # first iteration, result["name":[vishal], "password":[1234]]
                    # second iteration, only appends to those listss

                    # sooo, result["name" : ["vishal", "sim"]]
                    # each time, row will be one row from the table,
                    # row = [val1, val2, val3, ....]
                    # now we need to get val1 into the array of col1
                    # so we need to do row[0] to get col1 yeh saare columns nahi hooge? of the same row, nope row[1] to get col2
                    # colNameIndexMap[columns[j]]] will give the index of the row in the result
                    # row[colNameIndexMap[columns[j]]]] will give it's value! ok? umm wait yes

                    if i == 0:
                        for j in range(reqNumberOfColumns):
                            result[columns[j]] = [
                                row[colNameIndexMap[columns[j]]]]
                    # Second iteration, so just use append
                    else:
                        for j in range(reqNumberOfColumns):
                            result[columns[j]].append(
                                row[colNameIndexMap[columns[j]]])

                cursor.close()
                return json.dumps(result, default=str)
        except Exception as err:
                print(err)
                return Response(status=400)
            # Finally close the connection
        finally:
            if connection:
                cursor.close()
                connection.close()


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="6000", debug=True)
