from os import environ as env

import firebase_admin
from firebase_admin import firestore, credentials

from flask import Flask, request, jsonify
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv

from auth0.authentication import GetToken, Database
from auth0.management import Auth0

import firebase_controller

import pytz
import datetime

DOMAIN = "dev-0w6jwf2pp1i3mlla.us.auth0.com"
CLIENT_ID = "jqL66scu4L9XeaGnJNVJPA5jngQAsEBV"
CLIENT_SECRET = "AQjbCAFon1GYWlfuqBsGkmIIZzZTfHLuNyDpg0IyVCGDyyv0acVL-CrzznlW-6zP"
CONNECTION = "Username-Password-Authentication"

def initialize_AUTH0():
  try:
    get_token = GetToken(DOMAIN, CLIENT_ID, CLIENT_SECRET)
    token = get_token.client_credentials("https://{}/api/v2/".format(DOMAIN))

    mgmt_api_token = token['access_token']

    auth0 = Auth0(DOMAIN, token['access_token'])
    auth0 = Auth0(DOMAIN, mgmt_api_token)

    return auth0
  except Exception as e:
    return str(e)

oauth = initialize_AUTH0()
db_oauth = Database(DOMAIN, CLIENT_ID)

# ENV_FILE = find_dotenv()
# if ENV_FILE:
#   load_dotenv(ENV_FILE)

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")

oauth = OAuth(app)



@app.route("/")
def utilize_connection():
  """
  Utilize the connection to the Firebase app using security credentials from 'Kinetik'
  firebase project. Append all collections and their IDs and return the total data. 
  """

  return jsonify({'Init message': 'Initialized'})

@app.route("/signup_user", methods=["POST", "GET"])
def sign_up():
  COLLECTION_NAME = "User Information"
  raw_data = request.json
  email = raw_data.get("email")
  password = raw_data.get("password")
  first = raw_data.get("first_name")
  last = raw_data.get("last_name")
  type = raw_data.get("type")
  company_name = raw_data.get("company_name")

  try:
    success = db_oauth.signup(email=email, password=password, connection=CONNECTION)
    if success and success.email_verified == True:
      firebase_controller.add_user_to_firebase(email=email, first=first, last=last, type=type, collection_name=COLLECTION_NAME, company_name=company_name) # create a new user in the firestore document
      return jsonify({'message': 'Signed up successfully!'}, 200)
  except Exception as e:
    return jsonify({'message': str(e)}, 404)

@app.route("/login_user", methods=["POST", "GET"]) # we have to get the body to the GET request
def login():
  COLLECTION_NAME = "User Information"
  raw_data = request.json
  email = raw_data.get("email")
  password = raw_data.get("password")

  try:
    token = GetToken(DOMAIN, CLIENT_ID, CLIENT_SECRET)
    success = token.login(email, password, realm=CONNECTION)
  
    if success and success.email_verified == True:
      firebase_controller.update_user_in_firebase(email=email, collection_name=COLLECTION_NAME)
      return jsonify({'message': 'Updated user in Firebase!', 'access_token': success}, 200)
      # update the last login and the developer type using the email id

  except Exception as e:
    return jsonify({"message": str(e)}, 404)

@app.route('/validate_access_code', methods=["POST", "GET"])
def validate_code():
  raw_data = request.json # getting the provided data from the client
  access_code = raw_data.get('access_code')

  try:
    events_list = firebase_controller.validate_access_code(access_code, ("Company Information", "Access Codes")) # POST -> updating data
    return jsonify({'message': 'Successful', 'events': events_list}, 200)
  except Exception as e:
    return jsonify({'message': str(e)}, 400)

  
@app.route("/add_to_interest_list", methods=["POST", "GET"])
def add_interested():
  raw_data = request.json
  email = raw_data.get('email')
  user_note = raw_data.get('user_note')
  try:
    firebase_controller.add_user_to_interest_list(email, user_note, ("Company Information", "Interested Customers"))
    return jsonify({'message': 'Successfully added user to interest list!'}, 200)
  except Exception as e:
    return jsonify({'Error': str(e)}, 400)

@app.route("/reset_password", methods=["POST"])
def reset_password():
  raw_data = request.json
  email = raw_data.get('email')
  password = raw_data.get('password')
  try:
    db_oauth.change_password(email, CONNECTION, password)

    return jsonify({'message': 'Changed password!'}, 200)
  except Exception as e:
    return jsonify({'message': str(e)}, 400)

if __name__ == "__main__":
  app.run(debug=True) # run the backend app

