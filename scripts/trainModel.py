import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# Load the data (assuming it's stored in a JSON file after running fetchData.js)
print("Loading data from JSON file...")
data = pd.read_json('data.json')
print("Data loaded successfully!")
print(f"Data preview:\n{data.head()}")

# Preprocess data
print("Preprocessing data...")
data['date'] = pd.to_datetime(data['date'])
data['month'] = data['date'].dt.month
data['day'] = data['date'].dt.day
data['weekday'] = data['date'].dt.weekday
print("Data preprocessed!")
print(f"Preprocessed data preview:\n{data.head()}")

# Aggregate data by month and category
print("Aggregating data by month, weekday, and category...")
monthly_data = data.groupby(['month', 'weekday', 'category']).agg({
    'amount': 'sum'
}).reset_index()
print("Data aggregation complete!")
print(f"Aggregated data preview:\n{monthly_data.head()}")

# Prepare the dataset for training
print("Preparing the dataset for training...")
X = monthly_data[['month', 'weekday']]
y = monthly_data['amount']
print(f"Features preview:\n{X.head()}")
print(f"Target preview:\n{y.head()}")
print("Dataset prepared!")

# Splitting the data into training and testing sets
print("Splitting the data into training and testing sets...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print("Data split complete!")
print(f"X_train preview:\n{X_train.head()}")
print(f"y_train preview:\n{y_train.head()}")
print(f"X_test preview:\n{X_test.head()}")
print(f"y_test preview:\n{y_test.head()}")

# Train the model
print("Training the Linear Regression model...")
model = LinearRegression()
model.fit(X_train, y_train)
print("Model training complete!")
print(f"Model coefficients: {model.coef_}")
print(f"Model intercept: {model.intercept_}")

# Save the model
model_path = 'C:\\Users\\sachi\\OneDrive\\Desktop\\all\\finance_manger\\ai-finance-manager\\backend\\models\\spending_predictor.pkl'
print(f"Saving the model to {model_path}...")
joblib.dump(model, model_path)
print("Model saved successfully!")
