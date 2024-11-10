from flask import Flask, Response, jsonify, request
from typing import Any, Callable
import companies, user

app = Flask(__name__)

@app.route('/', methods='GET POST'.split())
def root():
    return jsonify({ 'Message': 'Hello world!' }, 200)

# naming scheme -> /table/operation
# expected parameters (as needed):
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
def master(table, operation):
    filter: dict[str, dict[str, Callable[[str, Any], Any]]] = {
        'companies': {
            'register': companies.register, # post
            'login': companies.login, # get
            'machine-access': companies.machine_access, # get (never call explicitly as event handler response)
            'events': companies.events, # get, post
            'submissions': companies.submissions, # get, delete
            'signout': None, # get
        },
        'users': {
            'register': user.register, # post
            'login': user.login, # get
            'machine-access': user.machine_access, # get (never call explicitly as event handler response)
            'events': user.events, # get
            'submissions': user.submissions, # get, post
            'signout': user.signout, # get
        },
    }
    if table not in filter or operation not in filter[table]:
        return 'nice try :]', 403
    return filter[table][operation](request.method, request.get_json(force=True))

if __name__ == '__main__':
    app.run(port=8080, debug=True)