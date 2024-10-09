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