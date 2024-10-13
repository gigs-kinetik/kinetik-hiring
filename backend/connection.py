from os import environ as env

import firebase_admin
from firebase_admin import firestore, credentials

from flask import Flask, request, jsonify
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv

from auth0.authentication import GetToken, Database
from auth0.management import Auth0

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

cred = credentials.Certificate('private_data/gigapp-8cc4b-firebase-adminsdk-ws9td-1fa46b4829.json') 
firebase_admin_app = firebase_admin.initialize_app(cred)
db_firestore = firestore.client()

@app.route("/")
def utilize_connection():
  """
  Utilize the connection to the Firebase app using security credentials from 'Kinetik'
  firebase project. Append all collections and their IDs and return the total data. 
  """

  try:
    collections = []

    for doc in db_firestore.collection("User Information").list_documents():
      print(doc.id)
    
    return jsonify({'collections': collections})

  except Exception as e:
    return(str(e))

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
      add_user_to_firebase(email=email, first=first, last=last, type=type, collection_name=COLLECTION_NAME, company_name=company_name) # create a new user in the firestore document
      return jsonify({'message': 'Signed up successfully!'}, 200)
  except Exception as e:
    return jsonify({'message': 'Error'}, 404)

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
      update_user_in_firebase(email=email, collection_name=COLLECTION_NAME)
      return jsonify({'message': 'Updated user in Firebase!', 'access_token': success}, 200)
      # update the last login and the developer type using the email id

  except Exception as e:
    return jsonify({"message": "Error!"}, 404)

def add_user_to_firebase(email, first, last, type, collection_name, company_name = None):
  try:
    doc_ref = db_firestore.collection(collection_name)
    datetime_time = get_login_time()
    new_user_data = {
      "First Name": first,
      "Last Name": last,
      "Last Login": f"{datetime_time[0]}, {datetime_time[1]}",
      "Type": type,
      "Num Events": 0,
      "Events": [],
    }

    if type == "Company" and company_name:
      new_user_data["Company Name"] = company_name
    
    doc_ref.add(new_user_data, email)
  except Exception as e:
    return str(e)

def update_user_in_firebase(email, collection_name):
  try:
    doc_ref = db_firestore.collection(collection_name).document(email)
    user_type = "Developer"
    doc_data = doc_ref.get()

    if doc_data.exists: # update the type that they login with
      user_data = doc_data.to_dict()
      user_type = user_data.get("Type", "Developer")
    else:
      doc_ref.set({'Type': 'Developer'})
    
    # update the last logged in value
    datetime_data = get_login_time()
    
    doc_ref.update({
      'Last Login': f"{datetime_data[0]}, {datetime_data[1]}",
      'Type': user_type
    })
  except Exception as e:
    return str(e)
  
def update_submissions():
  pass

@app.route("/reset_password", methods=["POST"])
def reset_password():
  raw_data = request.json
  email = raw_data.get('email')
  password = raw_data.get('password')
  try:
    db_oauth.change_password(email, CONNECTION, password)

    return jsonify({'message': 'Changed password!'}, 200)
  except Exception as e:
    return jsonify({'message': 'Error'}, 400)

def get_login_time():
  local_tz = pytz.timezone('America/Chicago') 
  curr_date = datetime.now(local_tz).strftime("%Y/%m/%d")
  curr_time = datetime.now(local_tz).strftime("%H:%M:%s")

  return (curr_date, curr_time)

if __name__ == "__main__":
  app.run(debug=True) # run the backend app

