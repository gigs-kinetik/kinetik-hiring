from flask import *
import firebase_admin
from firebase_admin import firestore, credentials

app = Flask(__name__)
# credentials that are used to give permission and connection access to Firebase project; located as JSON file in '\private_data'
cred = credentials.Certificate('private_data/gigapp-8cc4b-firebase-adminsdk-ws9td-1fa46b4829.json') 
# creates the connection to the Firebase app for functionality
default_app = firebase_admin.initialize_app(cred)
# get Firestore database instance
db = firestore.client()

@app.route("/")
def utilize_connection():
  """
  Utilize the connection to the Firebase app using security credentials from 'Kinetik'
  firebase project. Append all collections and their IDs and return the total data. 
  """

  try:
    collections = []

    for collection in db.collections():
      collections.append(collection.id)
    
    return jsonify({'collections': collections})

  except Exception as e: # exception
    print(str(e)) 

if __name__ == "__main__":
  app.run(debug=True) # run the backend app