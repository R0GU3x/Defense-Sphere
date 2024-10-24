from flask import Flask, render_template, request, redirect, url_for

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

#! ASK BURHAN TO SETUP POST METHOD FOR UPON SUBMIT

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        # You can add your authentication logic here
        print(f"Email: {email}, Password: {password}")
        return "Login successful!"
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)