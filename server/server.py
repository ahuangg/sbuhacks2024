from flask import Flask, jsonify, request
from flask_cors import CORS
from openai import OpenAI
import json  

app = Flask(__name__)
CORS(app)

@app.route("/response", methods=['GET','POST'])
def response():
    data = request.get_json()
    received_variable = data.get('variable')
    client = OpenAI()

    response = client.chat.completions.create(
    model="gpt-3.5-turbo-0125",
    messages=[
    {"role": "system", "content": """"You are the AI responsible for determining if a users input is a valid dressing prompt. Users will enter in search queries for occasions they are trying to dress for. 
     Your job is to determine if such a query makes sense. If they are going to an occasion like a piano rectial or their high school reunion, or if they say they simply want a black shirt. ANything related to clothing or anything you can relate back to clothing to some degree would count as a valid prompt. 
     If it is close to becoming a valid prompt you will return something that is akin to a valid prompt. So if they simple say 'piano recital,' you will  come up with a prompt for them. This prompt will then be used as input into another API call to generate ideas for dressing for that occasion. However, if the input is just random or not related to clothing, simply throw an error. All outputs should be JSON. If a prompt is valid then return TRUE as the boolean under 'VALIDITY' else FALSE, and return the prompt under 'prompt'. Otherwise simply throw an error.You are a virtual fashion consultant. For any given occasion, generate clothing suggestions formatted as a JSON object. The suggestions should cater to both male and female options, detailing 'style', 'accessories', 'fabric', and 'color'. Ensure the recommendations are appropriate for the context of the occasion described.
     Only return a response once you are fully done analyzing and ONLY return the JSON I am asking you to return. Otherwise keep waiting until you get a full response. Do not ask extra question and only return. You can make whatever assumptions is necessary to return the JSON. WAIT AS LONG AS IT IS NEEDED TO GET THE RESPONSE I WANT.
    For example, if the occasion is 'daughter's piano recital', think about the formality of the event, the venue, and typical attire suited for such an occasion. Your response should structured as follows:

    {
    'male': {
        'style': 'Specific style for men',
        'accessories': 'Suggested accessories for men',
        'fabric': 'Recommended fabric for men',
        'color': 'Ideal color for men'
    },
    'female': {
        'style': 'Specific style for women',
        'accessories': 'Suggested accessories for women',
        'fabric': 'Recommended fabric for women',
        'color': 'Ideal color for women'
    }
    }

    Please replace placeholders with actual recommendations based on the occasion. Come up with multiple suggestions for each gender for the occasion given."
    """},
    {"role": "user", "content": received_variable}
    ])

    response_json = json.loads(response.choices[0].message.content)
    print(response_json)
    return response_json

if __name__ == "__main__":
    app.run(debug="True", port=8080)