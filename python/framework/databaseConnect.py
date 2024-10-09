import mysql.connector

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost", # My friend has yet to provide the host
  user="yourusername", # My friend has yet to provide the username and password
  password="yourpassword"  # My friend has yet to provide the username and password
)

print(mydb)

# We will use this to do databases rather than an API for google drive or smth
# This is a snippet of code that connects to a database using mysql.connector
# MySQL, so fun

mycursor = mydb.cursor()

mycursor.execute("CREATE DATABASE mydatabase") # Creates a Database (I think)

# ----------------------------

mycursor.execute("SHOW DATABASES")

for x in mycursor:
  print(x) # Prints the databases
# ^ Can be used to check if a database exists

# ----------------------------

# This would connect to the database "mydatabase" if it existed, otherwise you get an error
mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  password="yourpassword",
  database="mydatabase"
)

mycursor = mydb.cursor()

mycursor.execute("CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))") # This creates a table if the code executes with no errors

# ----------------------------

mycursor.execute("SHOW TABLES")

for x in mycursor:
  print(x) # Prints the tables
# ^ Can be used to check if a table exists

# ----------------------------

# Just use this website for more stuff: https://www.w3schools.com/python/python_mysql_create_table.asp