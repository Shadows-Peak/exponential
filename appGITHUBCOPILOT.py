from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
import hashlib

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Example user data (in a real application, use a database)
users = {
    "user1": {"password": bcrypt.generate_password_hash("password1").decode('utf-8'), "score": 0}
}

# Secret key for hashing (in a real application, use a secure method to store this)
SECRET_KEY = "your_secret_key"

def hash_data(data):
    return hashlib.sha256((data + SECRET_KEY).encode()).hexdigest()

@app.route('/submit_score', methods=['POST'])
def submit_score():
    data = request.json
    username = data.get('username')
    score = data.get('score')
    hash_value = data.get('hash')

    if not username or not score or not hash_value:
        return jsonify({"error": "Invalid data"}), 400

    # Validate user
    user = users.get(username)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Validate hash
    expected_hash = hash_data(f"{username}{score}")
    if hash_value != expected_hash:
        return jsonify({"error": "Invalid hash"}), 400

    # Update score
    user['score'] = max(user['score'], score)
    return jsonify({"message": "Score updated successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)