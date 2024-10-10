import mysql.connector
from configparser import ConfigParser
config = ConfigParser()
file = 'config.ini'
config.read(file)

import mysql.connector

mydb = mysql.connector.connect(
  host = config[['server_data']['localhost']], # My friend has yet to provide the host
  user = config[['server_data']['yourusername']], # My friend has yet to provide the username and password
  password = config[['server_data']['yourpassword']]  # My friend has yet to provide the username and password
)

print(mydb)

# We will use this to do databases rather than an API for google drive or smth
# This is a snippet of code that connects to a database using mysql.connector
# MySQL, so fun
