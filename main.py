from flask import Flask, render_template, request, redirect, url_for, jsonify
import psutil
import threading
import core.Auth as auth
import core.FileIntegrity as FI

app = Flask(__name__)

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
    return render_template('dashboard.html', name=name)

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

        print(f'[~] Login Response Code: {response}')

        if response == 0:
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
    task, file = request.args.get('task'), request.args.get('file')
    if task and file:
        # file = file.replace('\\', '/')
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
         

    return render_template('FI-Monitor.html')

@app.route('/dashboard/FI-Monitor/data')
def fi_data():
    return jsonify(FI.DATA)
    
if __name__ == '__main__':

    # real-time file monitoring
    threading.Thread(target=FI.run).start()

    app.run(debug=True, use_reloader=False)