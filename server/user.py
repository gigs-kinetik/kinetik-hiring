from typing import Any
import random
from hashlib import sha256
import pytz
from datetime import datetime, timedelta
from util import supabase

"""
Operations:
register post
login get
machine-access get
events get (list events on filter)
submissions get (list submissions or user), post (submit an item)
"""

def now(): return datetime.now(pytz.utc)

def apply_salt(password: str, salt: str): return salt[:len(salt) // 2] + password + salt[len(salt) // 2:]

def register(method: str, body: Any):
    """
        [
            email,
            password,
            first_name,
            last_name,
            machine_id
        ]
    """
    salt = (lambda: ''.join(random.choices('abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456780!@#$%^&*()~`_-+={}[]|\\:";\'<>,.?/', k=32)) + ''.join(random.choices('abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456780!@#$%^&*()~`_-+={}[]|\\:";\'<>,.?/', k=random.randint(1, 32))))()
    
    if method != 'POST':
        return 'invalid method', 403
    
    res = supabase.table('users').insert({
        'first_name': body.get('first_name').strip(),
        'last_name': body.get('last_name').strip(),
        'user_email': body.get('email').strip(),
        'verified': False,
        'hashed_password': sha256(apply_salt(body.get('password').strip(), salt).encode()).hexdigest(),
        'salt': salt,
    }).execute()
    
    if hasattr(res, 'code'):
        return 'error', 501
    
    res = supabase.table('user_machines').upsert({
        'machine_id': body.get('machine_id').strip(),
        'user_id': res.data[0]['user_id'],
        'valid_until': (now() + timedelta(days=1)).isoformat()
    }).execute()
    
    if hasattr(res, 'code'):
        return 'error', 501
    
    return {
        'access_code': res.data[0]['access_code'],
        'id': res.data[0]['user_id'],
        'email': body.get('email').strip(),
        'first_name': body.get('first_name').strip(),
        'last_name': body.get('last_name').strip(),
    }, 200
    
def machine_access(method: str, body: Any):
    """
        [
            machine_id,
            access_code,
            id,
        ]
    """
    if method != 'PUT': 
        return 'invalid method', 403
    
    res = supabase.table('user_machines').select(
        'user_id,'
        'access_code,'
        'users (first_name, last_name, user_email)'
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
        'id': res.data[0]['user_id'],
        'first_name': res.data[0]['users']['first_name'],
        'last_name': res.data[0]['users']['last_name'],
        'email': res.data[0]['users']['user_email'],
    }, 200
    
def login(method: str, body: Any):
    """
        [
            machine_id?, // must exist for email, password auth
            access_code?, // either or OR
            
            email!,
            password!,
        ]
    """
    if method != 'PUT':
        return 'invalid method', 403
    
    if (body.get('machine_id') is None and body.get('access_code') is None) and (body.get('email') is None or body.get('password') is None):
        return 'invalid body', 400
    
    if body.get('access_code') is not None:
        return machine_access('PUT', { 'access_code': body.get('access_code') })
    
    if body.get('machine_id') is not None and (body.get('email') is None or body.get('password') is None):
        return machine_access('PUT', { 'machine_id': body.get('machine_id') })
    
    res = supabase.table('users').select('user_id, hashed_password, user_email, first_name, last_name, salt').eq('user_email', body.get('email')).execute()
    if hasattr(res, 'code'):
        return 'error', 501
    if len(res.data) == 0:
        return 'invalid creds', 404
        
    email, first_name, last_name = None, None, None
    for user in res.data:
        if user['hashed_password'] != sha256(apply_salt(body.get('password'), res.data[0]['salt']).encode()).hexdigest():
            return 'invalid creds', 404
        email, first_name, last_name = user['user_email'], user['first_name'], user['last_name']
    
    res = supabase.table('user_machines').upsert({
        'machine_id': body.get('machine_id').strip(),
        'user_id': res.data[0]['user_id'],
        'valid_until': (now() + timedelta(days=1)).isoformat()
    }).execute()
    
    if hasattr(res, 'code'):
        return 'error', 501
    
    result = {
        'access_code': res.data[0]['access_code'],
        'id': res.data[0]['user_id'],
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
    }, 200
    
    res = supabase.table('users').update({ 'last_login': now().isoformat() }).eq('user_id', result[0]['id']).execute()
    return result
    
def signout(method: str, body: Any):
    """
        [
            machine_id?, 
            access_code?, // either or OR
        ]
    """
    if method != 'PUT':
        return 'invalid method', 400
    
    res = supabase.table('user_machines').delete()
    if body.get('access_code') is not None:
        res = res.eq('access_code', body.get('access_code'))
    else:
        res = res.eq('machine_id', body.get('machine_id'))
    res = res.execute()
    
    if hasattr(res, 'code'):
        return 'error', 501
    return 'Signed out', 200
    
def events(method: str, body: Any):
    """
        [
            access_code,
            id,
            
            event_name?,
            start_time?,
            end_time?,
            general_search?, // across titles and descriptions
            prize_lower?,
            prize_upper?,
            submissions_lower?,
            submissions_upper?,
        ]
    """
    
    if method != 'PUT':
        return 'invalid method', 403
    
    result = machine_access('PUT', { 'access_code': body.get('access_code') })
    if result[1] != 200 or result[0].get('id') != body.get('id'):
        return 'invalid token', 400
    
    res = supabase.table('events').select(', '.join('event_id created_at company_id event_name start_time end_time short_description long_description prize submissions'.split()))
    
    if body.get('event_name') is not None:
        res = res.eq('event_name', f'%{body.get('event_name')}%')
    
    if body.get('start_time') is not None:
        res = res.gte('start_time', body.get('start_time'))
        
    if body.get('end_time') is not None:
        res = res.lte('end_time', body.get('end_time'))
        
    if body.get('general_search') is not None:
        v = body.get('general_search')
        res = res.or_(f'event_name.like.%{v}%, short_description.like.%{v}%, long_description.like.%{v}%')
        
    if body.get('prize_lower') is not None:
        res = res.gte('prize', body.get('prize_lower'))
    
    if body.get('prize_upper') is not None:
        res = res.lte('prize', body.get('prize_upper'))
        
    if body.get('submissions_lower') is not None:
        res = res.gte('submissions', body.get('submissions_lower'))
    
    if body.get('submissions_upper') is not None:
        res = res.lte('submissions', body.get('submissions_upper'))
        
    res = res.execute()
    
    if hasattr(res, 'code'):
        return 'error', 501
    return res.data, 200

def submissions(method: str, body: Any):
    """
        [
            access_code,
            id,
            
            (post?)
            submission_id?, // for updating existing data
            event_id,
            project_name,
            project_description,
            project_link,
            project_video_link?,
            resume_link?,
            additional_links?,
        ]
    """
    
    result = machine_access('PUT', { 'access_code': body.get('access_code') })
    if result[1] != 200 or result[0].get('id') != body.get('id'):
        return 'invalid token', 400
    
    def put():
        res = supabase.table('submissions').select(', '.join('*'.split())).eq('user_id', body.get('id'))
        if hasattr(res, 'code'):
            return 'error', 501
        return res.data, 200

    def post():
        res = supabase.table('submissions')
        if body.get('submission_id') is not None:
            res = res.upsert({
                'submission_id': body.get('submission_id'),
                **({'project_name': body.get('project_name')} if body.get('project_name') is not None else {}),
                **({'project_description': body.get('project_description')} if body.get('project_description') is not None else {}),
                **({'project_link': body.get('project_link')} if body.get('project_link') is not None else {}),
                **({'project_video_link': body.get('project_video_link')} if body.get('project_video_link') is not None else {}),
                **({'resume_link': body.get('resume_link')} if body.get('resume_link') is not None else {}),
                **({'additional_links': body.get('additional_links')} if body.get('additional_links') is not None else {}),
            }).execute()
        else:
            res = res.insert({
                'user_id': body.get('id'),
                'event_id': body.get('event_id'),
                'project_name': body.get('project_name'),
                'project_description': body.get('project_description'),
                'project_link': body.get('project_link'),
                **({'project_video_link': body.get('project_video_link')} if body.get('project_video_link') is not None else {}),
                **({'resume_link': body.get('resume_link')} if body.get('resume_link') is not None else {}),
                **({'additional_links': body.get('additional_links')} if body.get('additional_links') is not None else {}),
            }).execute()
            
        if hasattr(res, 'code'):
            return 'error', 501
        return res.data[0], 200
    
    if method == 'PUT':
        return put()
    if method == 'POST':
        return post()
    return 'invalid method', 403