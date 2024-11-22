import logging
from flask import Flask, Response, jsonify, request
from flask_cors import CORS, cross_origin
import json
from typing import Any, Callable
import companies, user

app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods='GET POST'.split())
@cross_origin()
def root():
    return jsonify({ 'Message': 'Hello world!' }, 200)

# naming scheme -> /table/operation
# expected parameters (as needed):
# !IMPORTANT: get requests should populate the data in the header, not the body
"""
{
    id: int
    access_code: string
    machine_id: string
    ... other parameters needed
}
"""

"""
Tables:
companies
company_access_codes
company_machines
events
submissions
user_access_codes
user_machines
users
"""

@app.route('/<table>/<operation>', methods='GET POST PUT DELETE'.split())
@cross_origin()
def master(table, operation):
    filter: dict[str, dict[str, Callable[[str, Any], Any]]] = {
        'companies': {
            'register': companies.register, # post
            'login': companies.login, # put
            'machine-access': companies.machine_access, # put (never call explicitly as event handler response)
            'events': companies.events, # put, post
            'submissions': companies.submissions, # put, delete
            'signout': companies.signout, # put
            'companies': companies.companies # post
        },
        'users': {
            'register': user.register, # post
            'login': user.login, # put
            'machine-access': user.machine_access, # put (never call explicitly as event handler response)
            'events': user.events, # put
            'submissions': user.submissions, # put, post
            'signout': user.signout, # put
            'users': user.users, # post
        },
    }
    if table not in filter or operation not in filter[table]:
        return 'nice try :]', 403
    return filter[table][operation](request.method, request.get_json(force=True))

if __name__ == '__main__':
    logging.getLogger('flask_cors').level = logging.DEBUG
    app.run(port=8080, debug=True)