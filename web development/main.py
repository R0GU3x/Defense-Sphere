from flask import Flask, render_template, request, redirect, url_for, jsonify
import psutil

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

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        if (email, password) == ('admin@gmail.com', 'admin'):
            # make the page route to dashboard.html
            return redirect('dashboard')
            # return render_template('dashboard.html')

    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/login/data')
def send_data():

    data = {
        'cpu': psutil.cpu_percent(),
        'net': 73,
        'ram': psutil.virtual_memory().percent,
        'rom': psutil.disk_usage('/').percent
    }

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)