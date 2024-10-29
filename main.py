from flask import Flask, render_template, request, redirect, url_for, jsonify, abort
import psutil
import threading
import core.Auth as auth
import core.FileIntegrity as FI
import pyautogui
import time
import os
import socket

app = Flask(__name__)

LOGGEDIN = False
pyautogui.FAILSAFE = False

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

@app.route('/dashboard')
def dashboard():
    if LOGGEDIN:
        return render_template('dashboard.html', name=name, userid=userID)
    else:
        return redirect('/login')

@app.route('/dashboard/data')
def dasboard_data():
    data = {'ip': socket.gethostbyname(socket.gethostname()),
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

        global response, name, username
        response, name, username = auth.login(userID, password)

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

@app.route('/logout')
def logout():
    global LOGGEDIN
    if LOGGEDIN:
        LOGGEDIN = False
    return redirect('/login')

# @app.route('/dashboard/profile')
# def profile():
#     if LOGGEDIN:
#         return render_template('Profile.html')
#     else:
#         return redirect('/login')

if __name__ == '__main__':

    # real-time file monitoring
    threading.Thread(target=FI.run).start()

    app.run(debug=True, use_reloader=False)