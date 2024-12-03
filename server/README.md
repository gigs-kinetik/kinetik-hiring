# Kinetik-gigs Flask Server

## Configuration
To configure the server, use the configuration variables available in the ```util.py``` file

## Extend functionality
The server is located in ```app.py```. You'll see something similar to this:

```python
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
        }
    }
    if table not in filter or operation not in filter[table]:
        return 'nice try :]', 403
    return filter[table][operation](request.method, request.get_json(force=True))
```

The dictionary maps from ```string -> string -> function```

Each function is identified by ```Callable[[str, dict], Any]``` which just means the first parameter is a string (the method being used to access the endpoint), the second parameter is a dictionary (representing the request body as JSON), and the function is expected to return anything. Specifically, stick to the return value format of (data: Any, status: int).

Refrain from making anything that uses get requests unless you are sure no data is needed from the requesting device. That's why everything is either put or post. Imagine put is a get request, since the request name doesn't actually matter, but put still allows the request to send data as JSON via the body.

You'll notice that the functions in the dictionary are split up into modules, and if you look into the function definitions, they follow a similar format to the one below.

```python
def machine_access(method: str, body: dict):
    """
        [
            machine_id,
            access_code,
        ]
    """
    if method != 'PUT': 
        return 'invalid method', 403
    
    res = supabase.table('company_machines').select(
        'company_id,'
        'access_code,'
        'companies (company_name, company_email)'
    )
    if body.get('access_code') is not None:
        res = res.eq('access_code', body.get('access_code')).gt('valid_until', now().isoformat())
    else:
        res = res.eq('machine_id', body.get('machine_id')).gt('valid_until', now().isoformat())
        
    res = res.execute()
    if hasattr(res, 'code'):
        return 'error', 501
    if len(res.data) == 0:
        return 'invalid access', 404

    return {
        'access_code': res.data[0]['access_code'],
        'id': res.data[0]['company_id'],
        'name': res.data[0]['companies']['company_name'],
        'email': res.data[0]['companies']['company_email'],
    }, 200
```

As you can see, the return values are all tuples of (data, status) and errors are handled. With supabase, since the python API doesn't have a consistent parameter to check for errors, use the hasattr function to check if the code attribute exists on the response. If it does, the request failed.

To continue, the functions should be ordered as such:
```python
def VERY_COOL_FUNCTION_NAME(method: str, body: dict):
    # Define the expectations of the body of a request to this endpoint
    """
        [
            expected_key
            optional_key?
            key // additional data on the side
        ]
    """

    # Handle any invalid methods (403 forbidden is the appropriate status code for this)
    if method != 'PUT' and method != 'POST':
        return 'invalid method', 403

    # Handle function logic

    return 'success', 200
```

Then to integrate into the server determine your path as server_url/a/b. Then insert into the app.py file.
```python
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
            'a': my_module.b # put, post (HERE IS THE NEW INSERTED ENDPOINT)
        }
    }
    if table not in filter or operation not in filter[table]:
        return 'nice try :]', 403
    return filter[table][operation](request.method, request.get_json(force=True))
```

Finally wrap up the functionality of your endpoint in typescript on the website side and you're done!