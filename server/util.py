from email.message import EmailMessage
import os
import smtplib
from supabase import create_client, Client

# url: str = os.environ.get("SUPABASE_URL")
# key: str = os.environ.get("SUPABASE_KEY")

url = "https://fbewajkbzwqrhapfxdpj.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZXdhamtiendxcmhhcGZ4ZHBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQyNzI3NywiZXhwIjoyMDQ2MDAzMjc3fQ.tF4Qpke91H_mSMrAXXCDgKY5N-TBmG9eLWV1Mq1gzkw"
supabase: Client = create_client(url, key)

server_port = 8080

server_debug_mode = True

# for dev
web_server_link = f'http://localhost:3000'

# for prod
# web_server_link = f'https://kinetikgigs.com'

verify_link: str = f'{web_server_link}/verify'

reset_link: str = f'{web_server_link}/reset'

verify_email = {
    'from_email': 'kinetikgigs@gmail.com',
    'app_password': 'tsox stws qmwy vumg',
    'subject': 'Kinetik Email Verification',
    'body': lambda x: f'''\
Please click the link below to verify your email.

{x}
'''
}

reset_email = {
    'from_email': 'kinetikgigs@gmail.com',
    'app_password': 'tsox stws qmwy vumg',
    'subject': 'Kinetik Password Reset',
    'body': lambda x: f'''\
Please click the link below to reset your password.

{x}
'''
}

def send_mail(from_email: str, from_password: str, to_email: list[str], subject: str, message: str, smtp='smtp.gmail.com', smtp_port=587):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = ', '.join(to_email)
    msg.set_content(message)
    print(msg)
    with smtplib.SMTP(smtp, smtp_port) as server:
        server.set_debuglevel(1)
        print('starting tls')
        server.starttls()
        print('ending tls')
        print('logging in')
        server.login(from_email, from_password)  # user & password
        print('logged in')
        server.send_message(msg)
    print('successfully sent the mail.')

def verify_account(to: str, id: int, access_code: str):
    send_mail(verify_email['from_email'], verify_email['app_password'], [to], verify_email['subject'], verify_email['body'](f'{verify_link}/{id}/{access_code}'))
    
def reset_password(to: str, id: int, access_code: str):
    send_mail(reset_email['from_email'], reset_email['app_password'], [to], reset_email['subject'], reset_email['body'](f'{reset_link}/{id}/{access_code}'))