import pytz
import datetime

import firebase_admin
from firebase_admin import firestore, credentials

cred = credentials.Certificate('private_data/gigapp-8cc4b-firebase-adminsdk-ws9td-1fa46b4829.json') 
firebase_admin_app = firebase_admin.initialize_app(cred)
db_firestore = firestore.client()

def validate_access_code(access_code, *collection_name): # landing page to take user to events
  try: 
    doc_ref = db_firestore.collection(collection_name[0]).document(collection_name[1])
    doc_data = doc_ref.get()
    if doc_data.get(access_code):
      return doc_data.get(access_code)
    return []
  except Exception as e:
    return str(e)

def get_timestamp():
  local_tz = pytz.timezone('America/Chicago') 
  curr_date = datetime.now(local_tz).strftime("%Y/%m/%d")
  curr_time = datetime.now(local_tz).strftime("%H:%M:%s")
  return (curr_date, curr_time)

def add_user_to_firebase(email, first, last, type, collection_name, company_name = None): # sign up
  try:
    doc_ref = db_firestore.collection(collection_name)
    datetime_time = get_timestamp()
    new_user_data = {
      "First Name": first,
      "Last Name": last,
      "Last Login": f"{datetime_time[0]}, {datetime_time[1]}",
      "Type": type,
    }
    if type == "Company" and company_name:
      new_user_data["Company Name"] = company_name
      new_user_data["Num Events"] = 0
      new_user_data["Events"] = []
    
    doc_ref.add(new_user_data, email)
  except Exception as e:
    return str(e)

def update_user_in_firebase(email, collection_name): # log in
  try:
    doc_ref = db_firestore.collection(collection_name).document(email)
    # user_type = "Developer"
    # doc_data = doc_ref.get()

    # if doc_data.exists: # update the type that they login with
    #   user_data = doc_data.to_dict()
    #   user_type = user_data.get("Type", "Developer")
    # else:
    #   doc_ref.set({'Type': 'Developer'})
    
    # update the last logged in value
    datetime_data = get_timestamp()
    doc_ref.update({
      'Last Login': f"{datetime_data[0]}, {datetime_data[1]}",
    })
  except Exception as e:
    return str(e)

def add_user_to_interest_list(email, user_type, *collection_name): # landing page
  try:
    doc_ref = db_firestore.collection(collection_name[0]).document(collection_name[1])
    timestamp = get_timestamp()
    email_data = {
      'Email': email,
      'Timestamp': timestamp,
      'Type': user_type,
    }
    doc_ref.update(
      {
        'Emails': firestore.ArrayUnion([email_data])
      }
    )
  except Exception as e:
    return str(e)