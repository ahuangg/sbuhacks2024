from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
from flask_pymongo import PyMongo
import bcrypt
import json  
from flask_cors import cross_origin

import urllib.request, json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config["MONGO_URI"] = "mongodb+srv://admin:Kvc4riIe7kySHblx@cluster0.z8wpbmf.mongodb.net/WearMe"
mongo = PyMongo(app)

def shopping_results(keyword):
    keyword = keyword.replace(" ", "%20")
    try:
        url = f"https://api.axesso.de/amz/amazon-search-by-keyword-asin?domainCode=com&keyword={keyword}&page=1&sortBy=relevanceblender"

        hdr ={
        'Cache-Control': 'no-cache',
        'axesso-api-key': 'd39560d471ce401cbbec58fb6ac78cff',
        }

        req = urllib.request.Request(url, headers=hdr)

        req.get_method = lambda: 'GET'
        result = [[]]

        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if data.get("responseStatus") == "PRODUCT_FOUND_RESPONSE" and data.get("foundProducts"):
                index = 0
                for product in data.get("searchProductDetails")[:5]:
                    name = product.get("productDescription", "No Name")
                    img_url = product.get("imgUrl", "No Image URL")
                    dp_url = "https://www.amazon.com" + product.get("dpUrl", "No DP URL")
                    # print(f"Name: {name}\nImage URL: {img_url}\nDP URL: {dp_url}\n")
                    result.append([name, img_url, dp_url])
                    index += 1
        return result

    except Exception as e:
        print(e)



app = Flask(__name__)
CORS(app)

@app.route("/response", methods=['GET','POST'])
def response():
    data = request.get_json()
    print(data)
    received_variable = data.get('data')['text']
    print('this is', received_variable)
    client = OpenAI()

    response = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    messages=[
    {"role": "system", "content": """You are a virtual fashion consultant. For any given occasion, generate clothing suggestions formatted as a JSON object. The suggestions should cater to both male and female options, detailing 'style', 'accessories', 'fabric', and 'color'. Ensure the recommendations are appropriate for the context of the occasion described.

    For example, if the occasion is 'daughter's piano recital', think about the formality of the event, the venue, and typical attire suited for such an occasion. The clothes array should inclulde all attire for that suggestion. So shirt, shoes, jacket, etc. Whatever clothes are suggested for that event. While the description array will describe each of the clothes corresponding to the suggested clothes in the previous array. Your response should structured as follows:

    {
    "male": {
        "clothes": ["clothe1", "clothe2", ...]
        "description": ["desc1 for clothe1", ...]
    },
    "female": {
        "clothes": ["clothe1", "clothe2", ...]
        "description": ["desc1 for clothe1", ...]
    }
    }

Please replace placeholders with actual recommendations based on the occasion. Come up with multiple suggestions for each gender for the occasion given.
"""},
    {"role": "user", "content": received_variable}
    ])

    response_json = json.loads(response.choices[0].message.content)
    search_string = ""

    for gender, details in response_json.items():
        counter = 0
        response_json[gender]['details'] = collections.defaultdict(list)

        for item in details['clothes']:
            if(counter == 1): break
            search_string = gender + " " + item + " clothes" 
            print(search_string)
            result = shopping_results(search_string)[1:]
            
            idk = "item" + str(counter)
            response_json[gender]['details'][idk].append(result)
            counter += 1
            
    print(response_json)
    return response_json


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password').encode('utf-8')  # Ensure password is in bytes
    salt = bcrypt.gensalt()
    
    if mongo.db.users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.hashpw(password, salt)
    mongo.db.users.insert_one({
        "name": name,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password').encode('utf-8')  # Convert password to bytes

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = mongo.db.users.find_one({"email": email})

    if user and bcrypt.checkpw(password, user["password"]):
        return jsonify({"name": user["name"]}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

if __name__ == "__main__":
    app.run(debug="True", port=8080)