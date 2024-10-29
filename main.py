from flask import Flask, render_template, request, redirect, url_for, jsonify, abort
import psutil
import threading
import core.Auth as auth
import core.FileIntegrity as FI
import pyautogui
import time

app = Flask(__name__)

LOGGEDIN = False

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about-us')
def about_us():
    return render_template('about-us.html')

@app.route('/article')
def article():
    return render_template('article.html')

@app.route('/support')
def support():
    return render_template('support.html')

@app.route('/dashboard', methods=['GET'])
def dashboard():
    auth = request.args.get('auth')
    if auth:
        return render_template('dashboard.html', name=name)
    else:
        return abort(403)

@app.route('/dashboard/data')
def dasboard_data():
    data = {'cpu': psutil.cpu_percent(),
            'ram': psutil.virtual_memory().percent,
            'rom': psutil.disk_usage('/').percent,
            'net': 73}
    return jsonify(data)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        try:
            userID = int(request.form['user-id'])
        except:
            userID = -1
        password = request.form['password']

        global response, name, username
        response, name, username = auth.login(userID, password)

        global LOGGEDIN
        if response == 0:
            LOGGEDIN = True
            return redirect('dashboard')
        if response == 1:
            pass
        
    return render_template('login.html')

@app.route('/login/data')
def login_data():
    data = {'response':response}
    return jsonify(data)


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        firstName = request.form['first-name']
        username = request.form['username']
        password = request.form['password']

        global userID
        userID = auth.register(firstName, username, password)
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
        if task and file:
            if task == 'add':
                FI.add(file)
            elif task == 'clear':
                FI.clear(file)
                for _ in range (2):
                    time.sleep(1)
                    manual_reload()
            elif task == 'remove':
                FI.remove(file)
                for _ in range (2):
                    time.sleep(1)
                    manual_reload()
            elif task == 'pause':
                FI.pause(file)
            elif task == 'resume':
                FI.resume(file)         

        return render_template('FI-Monitor.html')
    
    else:
        return redirect('/login')

@app.route('/dashboard/FI-Monitor/data')
def fi_data():
    if LOGGEDIN:
        return jsonify(FI.DATA)
    else:
        abort(403)

@app.route('/reload', methods=['GET'])
def manual_reload():
    pyautogui.press('f5')
    return jsonify(1)

if __name__ == '__main__':

    # real-time file monitoring
    threading.Thread(target=FI.run).start()

    app.run(debug=True, use_reloader=False)