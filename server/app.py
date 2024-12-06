import logging
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from typing import Callable, Any
from util import SERVER_PORT, SERVER_DEBUG_ON
import companies, user, events, agents

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods='GET POST'.split())
@cross_origin()
def root():
    return jsonify({ 'Message': 'Hello world!' }, 200)

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
    filter: dict[str, dict[str, Callable[[str, dict], Any]]] = {
        'companies': {
            'register': companies.register, # post
            'login': companies.login, # put
            'machine-access': companies.machine_access, # put (never call explicitly as event handler response)
            'events': companies.events, # put, post, delete
            'submissions': companies.submissions, # put, delete
            'signout': companies.signout, # put
            'companies': companies.companies, # post, put
            'verify': companies.verify, # put
            'reset-password': companies.reset, # put
        },
        'users': {
            'register': user.register, # post
            'login': user.login, # put
            'machine-access': user.machine_access, # put (never call explicitly as event handler response)
            'events': user.events, # put
            'submissions': user.submissions, # put, post
            'signout': user.signout, # put
            'users': user.users, # post
            'verify': user.verify, # put
            'reset-password': user.reset, # put
        },
        'events': {
            'get': events.get, # put
            'get-submissions': events.get_submissions, # put
        },
        'ml-agents': {
            'challenge-generator': agents.challenge_generator, # post
        }
    }
    if table not in filter or operation not in filter[table]:
        return 'nice try :]', 403
    return filter[table][operation](request.method, request.get_json(force=True))

if __name__ == '__main__':
    logging.getLogger('flask_cors').level = logging.DEBUG
    app.run(port=SERVER_PORT, debug=SERVER_DEBUG_ON)