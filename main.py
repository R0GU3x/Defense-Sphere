from flask import Flask, render_template, redirect, jsonify, abort, request
import core.Auth as auth
import core.FileIntegrity as FI
import core.Validation as Validation
import core.VPN as VPN
import core.CyberNews as Cybernews
import core.Phishing as Phishing
import psutil, threading, os, requests

app = Flask(__name__)

LOGGEDIN = False

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
            LOGGEDIN = True
            return redirect('dashboard')
        if response == 1:
            pass
    
    if not LOGGEDIN:
        return render_template('login.html')
    else:
        return redirect('/dashboard')

@app.route('/login/data')
def login_data():
    data = {'response':response}
    return jsonify(data)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        firstName = request.form['first-name']
        role = request.form['job-role']
        username = request.form['username']
        password = request.form['password']

        global userID
        userID = auth.register(firstName, role, username, password)
        print(userID)

        return redirect('login')

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
            elif task == 'clear':
                FI.clear(file)
            elif task == 'remove':
                FI.remove(file)
            elif task == 'pause':
                FI.pause(file)
            elif task == 'resume':
                FI.resume(file)
            # -------------------------
            return redirect('/dashboard/FI-Monitor')

        elif file and action:
            if action == 'open':
                os.startfile(file)
            # --------------------------
            return redirect('/dashboard/FI-Monitor')
        
        return render_template('FI-Monitor.html')
    
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
            data = eval(Validation.check_email(data['email']).replace('true', 'True').replace('false', 'False').replace('null', 'None'))
            response = 1 if data['deliverability'] == 'DELIVERABLE' else 0
        
        elif 'country' in keys and 'phone' in keys:
            data = eval(Validation.check_phone(country_codes[data['country']], data['phone']).replace('true', 'True').replace('false', 'False').replace('null', 'None'))
            try:
                response = 1 if data['valid'] == True else 0
            except:
                response = 0
        
        elif 'iban' in keys:
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
            return render_template('Phishing.html')
        else:
            data = request.get_json()
            email = data['content']

            response = 'safe' if Phishing.run(email) == 0 else 'danger'

            return jsonify(response)
    else:
        return redirect('/login')



@app.route('/dashboard/password-gen')
def password_generator():
    if LOGGEDIN:
        return render_template('Password-Generator.html')
    else:
        return abort(403)

@app.route('/logout')
def logout():
    global LOGGEDIN
    if LOGGEDIN:
        LOGGEDIN = False
    return redirect('/login')


if __name__ == '__main__':

    # real-time file monitoring
    threading.Thread(target=FI.run).start()

    app.run(debug=True, use_reloader=False, host='0.0.0.0')