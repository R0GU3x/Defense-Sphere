from flask import Flask, render_template, redirect, jsonify, abort, request
import core.Auth as auth
import core.FileIntegrity as FI
import core.Validation as Validation
import core.VPN as VPN
import core.CyberNews as Cybernews
import core.Phishing as Phishing
import core.ExtDev as xdev
import core.Logs as Logs
import core.FaceRecon as FaceRecon
import psutil, threading, os, requests

app = Flask(__name__)

LOGGEDIN = False

def log_string(uname:str|int, action:str) -> str:
    return f'<span title="{uname}"> {action} </span>'

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about-us')
def about_us():
    return render_template('about-us.html')

@app.route('/articles')
def article():
    return render_template('articles.html')

@app.route('/articles/data')
def article_data():
    return jsonify(Cybernews.run())

@app.route('/support')
def support():
    return render_template('support.html')

@app.route('/dashboard')
def dashboard():
    if LOGGEDIN:
        return render_template('dashboard.html', name=name, role=role, userid=userID)
    else:
        return redirect('/login')

@app.route('/dashboard/data')
def dasboard_data():
    data = {'ip': None,
            'ram': psutil.virtual_memory().percent,
            'rom': psutil.disk_usage('/').percent,
            'net': 73}
    return jsonify(data)

@app.route('/login', methods=['GET', 'POST'])
def login():
    global userID
    if request.method == 'POST':
        try:
            userID = int(request.form['user-id'])
        except:
            userID = -1
        password = request.form['password']

        global response, name, role, username
        response, name, role, username = auth.login(userID, password)

        global LOGGEDIN
        if response == 0:
            # Logs.write_log(f'<span title="{username}"> <b>Action:</b> Login Successful </span>')
            Logs.write_log(log_string(username, 'Login Successful'))
            LOGGEDIN = True
            # return redirect('/dashboard')
            return redirect('/face-recon')
        elif response == 1:
            Logs.write_log(log_string(userID, 'Incorrect Password'))
        elif response == 2:
            Logs.write_log(log_string(userID, 'Invalid UserID'))
    
    if not LOGGEDIN:
        return render_template('login.html')
    else:
        return redirect('/dashboard')

@app.route('/login/data')
def login_data():
    data = {'response':response}
    return jsonify(data)

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        dataType, prompt = request.get_json().values()
        row = auth.forgot_password(dataType, prompt)
        print(row)
        if row:
            # return redirect('/two-factor-auth')
            return jsonify(1)
    return render_template('forgot-password.html')


@app.route('/two-factor-auth', methods=['GET', 'POST'])
def two_factor_authentication():
    if request.method == 'POST':
        # authentication = request.args.get('authentication')
        data = request.get_json()
        print(data)
        return jsonify(1)
    
    return render_template('two-factor-auth.html')
    # return render_template('reset-password.html')

@app.route('/reset-password')
def reset_password():
    return render_template('reset-password.html')

@app.route('/settings')
def settings():
    if LOGGEDIN:
        return render_template('settings.html')
    else:
        return abort(404)

notifications = ['Security breach detected mathafuckah', 'Your OTP is 80085', 'Kya re bheek mangya']
@app.route('/notifications/data', methods=['GET'])
def notification_data():
    global notifications
    if LOGGEDIN:
        action, index = request.args.get('action'), request.args.get('index')

        if action == 'display':
            return jsonify(notifications)
        elif action == 'remove':
            notifications.pop(int(index))
            return jsonify(0)
        elif action == 'clear':
            notifications.clear()
            return jsonify(0)
        
    else:
        return abort(404)
    
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        firstName = request.form['first-name']
        role = request.form['job-role']
        username = request.form['username']
        password = request.form['password']

        global userID
        userID = auth.register(firstName, role, username, password)

        Logs.write_log(log_string(userID, 'New account registered'))

        return redirect('/login')

    return render_template('register.html')

@app.route('/register/data')
def register_data():
    data = {'userID':userID}
    return jsonify(data)

@app.route('/dashboard/FI-Monitor', methods=['GET'])
def fi_monitoring():
    if LOGGEDIN:
        task, file = request.args.get('task'), request.args.get('file')
        file, action = request.args.get('file'), request.args.get('action')

        if task and file:
            if task == 'add':
                FI.add(file)
                Logs.write_log(log_string(username, '<b>FMI:</b> File added'))
            elif task == 'clear':
                FI.clear(file)
                Logs.write_log(log_string(username, '<b>FMI:</b> File cleared'))
            elif task == 'remove':
                FI.remove(file)
                Logs.write_log(log_string(username, '<b>FMI:</b> File removed'))
            elif task == 'pause':
                FI.pause(file)
                Logs.write_log(log_string(username, '<b>FMI:</b> File paused'))
            elif task == 'resume':
                FI.resume(file)
                Logs.write_log(log_string(username, '<b>FMI:</b> File resumed'))
            # -------------------------
            return redirect('/dashboard/FI-Monitor')

        elif file and action:
            if action == 'open':
                Logs.write_log(log_string(username, '<b>FMI:</b> File opened'))
                os.startfile(file)
            # --------------------------
            return redirect('/dashboard/FI-Monitor')
        
        return render_template('fi-monitor.html')
    
    else:
        return redirect('/login')

@app.route('/dashboard/FI-Monitor/data')
def fi_data():
    if LOGGEDIN:
        return jsonify(FI.DATA)
    else:
        abort(403)

country_codes = {
    '+93': 'AF',  # Afghanistan
    '+355': 'AL',  # Albania
    '+49': 'DE',  # Germany
    '+376': 'AD',  # Andorra
    '+971': 'AE',  # United Arab Emirates
    '+1': 'US',  # United States
    '+44': 'GB',  # United Kingdom
    '+91': 'IN',  # India
    '+62': 'ID',  # Indonesia
    '+81': 'JP',  # Japan
    '+86': 'CN',  # China
    '+82': 'KR',  # South Korea
    '+61': 'AU',  # Australia
    '+55': 'BR',  # Brazil
    '+51': 'PE',  # Peru
    '+20': 'EG',  # Egypt
    '+60': 'MY',  # Malaysia
    '+52': 'MX',  # Mexico
    '+33': 'FR',  # France
    '+39': 'IT',  # Italy
    '+34': 'ES',  # Spain
    '+46': 'SE',  # Sweden
    '+41': 'CH',  # Switzerland
    '+7': 'RU',  # Russia
    '+64': 'NZ',  # New Zealand
    '+30': 'GR',  # Greece
    '+31': 'NL',  # Netherlands
    '+32': 'BE',  # Belgium
    '+45': 'DK',  # Denmark
    '+36': 'HU',  # Hungary
    '+421': 'SK',  # Slovakia
    '+421': 'SI',  # Slovenia
    '+372': 'EE',  # Estonia
    '+358': 'FI',  # Finland
    '+353': 'IE',  # Ireland
    '+354': 'IS',  # Iceland
    '+381': 'RS',  # Serbia
    '+373': 'MD',  # Moldova
    '+370': 'LT',  # Lithuania
    '+371': 'LV',  # Latvia
    '+381': 'BA',  # Bosnia and Herzegovina
    '+48': 'PL',  # Poland
    '+351': 'PT',  # Portugal
    '+30': 'CY',  # Cyprus
    '+994': 'AZ',  # Azerbaijan
    '+996': 'KG',  # Kyrgyzstan
    '+992': 'TJ',  # Tajikistan
    '+993': 'TM',  # Turkmenistan
    '+994': 'AZ',  # Azerbaijan
    '+995': 'GE',  # Georgia
}

@app.route('/dashboard/validate', methods=['POST'])
def profile():
    if LOGGEDIN:

        data = request.get_json()
        keys = tuple(data.keys())

        if 'email' in keys:
            Logs.write_log(log_string(username, f'Email Validation - {data["email"]}'))

            data = eval(Validation.check_email(data['email']).replace('true', 'True').replace('false', 'False').replace('null', 'None'))
            response = 1 if data['deliverability'] == 'DELIVERABLE' else 0
        
        elif 'country' in keys and 'phone' in keys:
            Logs.write_log(log_string(username, f'Phone Validation - +{data["country"]} {data["phone"]}'))

            data = eval(Validation.check_phone(country_codes[data['country']], data['phone']).replace('true', 'True').replace('false', 'False').replace('null', 'None'))
            try:
                response = 1 if data['valid'] == True else 0
            except:
                response = 0
        
        elif 'iban' in keys:
            Logs.write_log(log_string(username, f'IBAN Validation - {data["iban"]}'))

            data = eval(Validation.check_iban(data['iban']).replace('true', 'True').replace('false', 'False').replace('null', 'None'))
            try:
                response = 1 if data['valid'] == True else 0
            except:
                response = 0

        return jsonify(response)
    else:
        return redirect('/login')
    
@app.route('/vpn', methods=['POST'])
def vpn():
    if LOGGEDIN:
        switch = request.get_json()

        if switch == 1:
            Logs.write_log(log_string(username, f'VPN activated'))
            data = VPN.run()

        elif switch == 0:
            ip = requests.get('http://httpbin.org/ip').json()['origin']
            locData = requests.get(f'http://ip-api.com/json/{ip}').json()
            data = {
                'query': ip,
                'country': locData['country'],
                'city': locData['city'],
                'regionName': locData['regionName']
            }

        return jsonify(data)

@app.route('/dashboard/phishing', methods=['GET', 'POST'])
def phishing():
    if LOGGEDIN:
        if request.method != 'POST':
            return render_template('phishing.html')
        else:
            data = request.get_json()
            email = data['content']
            
            if Phishing.run(email) == 0:
                response = 'safe'
            else:
                Logs.write_log(log_string(username, 'Caught a spam email !'))
                response = 'danger'

            return jsonify(response)
    else:
        return redirect('/login')

@app.route('/dashboard/password-gen')
def password_generator():
    if LOGGEDIN:
        return render_template('password-generator.html')
    else:
        return abort(403)

@app.route('/dashboard/logs')
def logs_manager():
    if LOGGEDIN:
        return render_template('logs.html')
    else:
        return redirect('/login')

@app.route('/dashboard/logs/data')
def logs_data():
    if LOGGEDIN:
        data = Logs.read_logs()
        data.reverse()
        return jsonify(data)
    else:
        return abort(403)

@app.route('/logout')
def logout():
    global LOGGEDIN
    if LOGGEDIN:
        Logs.write_log(log_string(username, 'Logged out'))
        LOGGEDIN = False
    return redirect('/login')

@app.route('/save-reference-image', methods=['POST'])
def save_reference_image():
    if 'image' not in request.files:
        return {'error': 'No image file'}, 400
        
    image_file = request.files['image']
    
    # Create a directory for storing images if it doesn't exist
    if not os.path.exists('core/data'):
        os.makedirs('core/data')
    
    # Save the image
    save_path = os.path.join('core/data', 'reference.jpg')
    try:
        image_file.save(save_path)
        return {'success': True}, 200
    except Exception as e:
        print(f"Error saving image: {e}")
        return {'error': str(e)}, 500

@app.route('/face-recon')
def face_recon():
    f = FaceRecon.FaceRecon(1)
    r = 1 if f.run() else 0
    if r == 1:
        return redirect('/dashboard')
    else:
        return redirect('/login')
    
    return {'isAuthorized': r}

if __name__ == '__main__':

    # real-time file monitoring
    threading.Thread(target=FI.run).start()
    threading.Thread(target=xdev.run).start()

    app.run(debug=True, use_reloader=False, host='0.0.0.0')