from util import supabase

def get(method: str, body: dict):
    """ 
        event_id
    """
    
    if method != 'PUT':
        return 'invalid method', 403
    
    res = supabase.table('events').select('*').eq('event_id', body.get('event_id')).execute()
    if hasattr(res, 'code'):
        return 'error', 404
    return res.data[0], 200

def get_submissions(method: str, body: dict):
    """ 
        id
    """
    
    if method != 'PUT':
        return 'invalid method', 403
    
    print(body)
    res = supabase.table('submissions').select('events(*)').eq('user_id', body.get('id')).execute()
    if hasattr(res, 'code'):
        return 'error', 404
    arr = []
    for a in res.data:
        arr.append(a['events'])
    return arr, 200