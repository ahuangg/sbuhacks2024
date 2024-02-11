from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import json  

import urllib.request, json

def shopping_results(keyword):
    keyword = keyword.replace(" ", "%20")
    try:
        url = "https://api.axesso.de/amz/amazon-search-by-keyword-asin?domainCode=com&keyword={keyword}&page=1&sortBy=relevanceblender"

        hdr ={
        'Cache-Control': 'no-cache',
        'axesso-api-key': '59345adcf379474cbda51890e7847fe6',
        }

        req = urllib.request.Request(url, headers=hdr)

        req.get_method = lambda: 'GET'
        response = urllib.request.urlopen(req)
        print(response.getcode())
        print(response.read())
    except Exception as e:
        print(e)
    return response


app = Flask(__name__)
CORS(app)

@app.route("/response", methods=['GET','POST'])
def response():
    # data = request.get_json()
    # received_variable = data.get('text')
    # print(received_variable)
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
    {"role": "user", "content": "give me a wedding outfit"}
    ])

    response_json = json.loads(response.choices[0].message.content)
    search_string = ""
    for gender, details in response_json.items():
        for item in details['clothes']:
            search_string = gender + " " + item
            # shopping_results(search_string)
    return response_json

if __name__ == "__main__":
    app.run(debug="True", port=8080)