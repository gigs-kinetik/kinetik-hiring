from email.message import EmailMessage
import smtplib
from supabase import create_client, Client

# url: str = os.environ.get("SUPABASE_URL")
# key: str = os.environ.get("SUPABASE_KEY")

SUPABASE_URL = "https://fbewajkbzwqrhapfxdpj.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZXdhamtiendxcmhhcGZ4ZHBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQyNzI3NywiZXhwIjoyMDQ2MDAzMjc3fQ.tF4Qpke91H_mSMrAXXCDgKY5N-TBmG9eLWV1Mq1gzkw"
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

SERVER_PORT = 8080

SERVER_DEBUG_ON = False

OPEN_AI_KEY = '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'

# for dev
WEBSITE_BASE_LINK = f'http://localhost:3000'

# for prod
# web_server_link = f'https://kinetikgigs.com'

VERIFICATION_LINK: str = f'{WEBSITE_BASE_LINK}/verify'

PASSWORD_RESET_LINK: str = f'{WEBSITE_BASE_LINK}/reset'


# Everything is self-explanatory, but the body is a lambda because the link to the verification endpoint is dynamically processed and put into the parameter x
VERIFICATION_EMAIL_CONFIG = {
    'from_email': 'kinetikgigs@gmail.com',
    'app_password': 'tsox stws qmwy vumg',
    'subject': 'Kinetik Email Verification',
    'body': lambda x: f'''\
Please click the link below to verify your email.

{x}
'''
}

# Everything is self-explanatory, but the body is a lambda because the link to the resetting endpoint is dynamically processed and put into the parameter x
PASSWORD_RESET_EMAIL_CONFIG = {
    'from_email': 'kinetikgigs@gmail.com',
    'app_password': 'tsox stws qmwy vumg',
    'subject': 'Kinetik Password Reset',
    'body': lambda x: f'''\
Please click the link below to reset your password.

{x}
'''
}


#
# IGNORE EVERYTHING PAST THIS AS SIMPLE HELPER FUNCTIONS
#

def send_mail(from_email: str, from_password: str, to_email: list[str], subject: str, message: str):
    msg = EmailMessage()
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = ', '.join(to_email)
    msg.set_content(message)
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.set_debuglevel(False)
        server.starttls()
        server.login(from_email, from_password)  # user & password
        server.send_message(msg)

def verify_account(to: str, id: int, access_code: str):
    send_mail(VERIFICATION_EMAIL_CONFIG['from_email'], VERIFICATION_EMAIL_CONFIG['app_password'], [to], VERIFICATION_EMAIL_CONFIG['subject'], VERIFICATION_EMAIL_CONFIG['body'](f'{VERIFICATION_LINK}/{id}/{access_code}'))
    
def reset_password(to: str, id: int, access_code: str):
    send_mail(PASSWORD_RESET_EMAIL_CONFIG['from_email'], PASSWORD_RESET_EMAIL_CONFIG['app_password'], [to], PASSWORD_RESET_EMAIL_CONFIG['subject'], PASSWORD_RESET_EMAIL_CONFIG['body'](f'{PASSWORD_RESET_LINK}/{id}/{access_code}'))