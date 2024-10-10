from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_value')
def get_value():
    value = "Test 2 with flask actually installed in the terminal (im stupid)!"  # Your variable value
    return jsonify({'value': value})

if __name__ == '__main__':
    app.run(debug=True)