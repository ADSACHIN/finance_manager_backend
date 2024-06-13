from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('models/spending_predictor.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    month = data['month']
    weekday = data['weekday']
    
    # Prepare input for the model
    input_data = np.array([[month, weekday]])
    
    # Make prediction
    prediction = model.predict(input_data)
    
    return jsonify({'predictedAmount': prediction[0]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
