import sys
import json
import joblib
import numpy as np
import pandas as pd

def main():
    if len(sys.argv) < 2:
        print("Please provide input data as a JSON string.", file=sys.stderr)
        sys.exit(1)

    try:
        input_data = json.loads(sys.argv[1])
        print(f"Input data received: {input_data}", file=sys.stderr)
    except json.JSONDecodeError:
        print("Invalid JSON input.", file=sys.stderr)
        sys.exit(1)

    if 'month' not in input_data or 'weekday' not in input_data:
        print("Input data must contain 'month' and 'weekday' keys.", file=sys.stderr)
        sys.exit(1)

    month = input_data['month']
    weekday = input_data['weekday']

    try:
        model_path = 'C:\\Users\\sachi\\OneDrive\\Desktop\\all\\finance_manger\\ai-finance-manager\\backend\\models\\spending_predictor.pkl'
        print(f"Loading model from {model_path}", file=sys.stderr)
        model = joblib.load(model_path)
        print("Model loaded successfully", file=sys.stderr)
    except FileNotFoundError:
        print(f"Model file not found at {model_path}.", file=sys.stderr)
        sys.exit(1)

    try:
        input_df = pd.DataFrame([[month, weekday]], columns=['month', 'weekday'])
        print(f"Input DataFrame: {input_df}", file=sys.stderr)
        prediction = model.predict(input_df)
        print(f"Prediction made: {prediction}", file=sys.stderr)
    except Exception as e:
        print(f"Error making prediction: {e}", file=sys.stderr)
        sys.exit(1)

    result = {'predictedAmount': prediction[0]}
    print(json.dumps(result))

if __name__ == "__main__":
    main()
