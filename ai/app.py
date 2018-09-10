from flask import Flask
from flask import Response
from flask import request
import flask
import json
import pandas as pd
from regression import train, predict
from test import test
from regression_nn import array_to_array_of_arrays
from food_recognition import recognize_food

app = Flask(__name__)

@app.route("/train",methods=['POST'])
def train_():
    js = request.get_json()        
    if 'email' not in js or 'data' not in js:
        return 'missing email or data' 
    y = train(js['email'], js['data'])
    return 'success'

@app.route("/predict",methods=['POST'])
def pred_():
    js = request.get_json()    
    if 'email' not in js or 'data' not in js:
        return 'missing email or data' 
    result = predict(js['email'],array_to_array_of_arrays([js['data']]))
    result = pd.Series(result).to_json(orient='values')
    return Response(json.dumps(result),  mimetype='application/json')

@app.route("/test")
def test_():
    test()
    return 'success'

@app.route("/recognize", methods=['POST'])
def recognize():
    imagefile = flask.request.files.get('image', '')
    return recognize_food(imagefile)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)