from flask import Flask, render_template, request, redirect, session, url_for
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from werkzeug.security import check_password_hash

app = Flask(__name__)
app.secret_key = 'rahasia'  # ganti ke secret key aman

# Setup Google Sheets API
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)
sheet_users = client.open("Atmin").worksheet("Atmin")
sheet_transaksi = client.open("Transaksi").worksheet("Transaksi")

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        users = sheet_users.get_all_records()
        for user in users:
            if user['email'] == email and check_password_hash(user['password_hash'], password):
                session['email'] = email
                session['role'] = user['role']
                if user['role'] == 'admin':
                    return redirect('/admin')
                else:
                    return redirect('/kasir')
        return render_template('login.html', error="Email atau password salah")
    return render_template('login.html')

@app.route('/admin')
def admin_panel():
    if session.get('role') != 'admin':
        return redirect('/')
    return render_template('admin_panel.html', email=session.get('email'))

@app.route('/kasir')
def kasir_panel():
    if session.get('role') != 'kasir':
        return redirect('/')
    return render_template('kasir_panel.html', email=session.get('email'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)