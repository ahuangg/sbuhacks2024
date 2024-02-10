from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/response", methods=['GET'])
def response():
    return jsonify({
        "message": "This is a test"
    })

if __name__ == "__main__":
    app.run(debug="True", port=8080)