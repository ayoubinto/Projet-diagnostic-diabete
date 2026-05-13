import joblib
import json
import pandas as pd

# ==============================
# 1. LOAD MODEL + FEATURES
# ==============================
model = joblib.load('ml/models/xgboost_model.pkl')

with open('ml/models/features.json', 'r', encoding='utf-8') as f:
    features = json.load(f)

def predict(user_input):
    gender_value = 1 if user_input.gender == "Male" else 0

    smoking_categories = ['never', 'No Info', 'current', 'former', 'ever', 'not current']
    smoking_dict = {cat: 0 for cat in smoking_categories}

    if user_input.smoking_history in smoking_dict:
        smoking_dict[user_input.smoking_history] = 1

    final_input = {
        "age": user_input.age,
        "hypertension": user_input.hypertension,
        "heart_disease": user_input.heart_disease,
        "bmi": user_input.bmi,
        "HbA1c_level": user_input.HbA1c_level,
        "blood_glucose_level": user_input.blood_glucose_level,
        "gender_encoder": gender_value
    }

    final_input.update(smoking_dict)

    input_df = pd.DataFrame([final_input])

    for col in features:
        if col not in input_df.columns:
            input_df[col] = 0

    input_df = input_df[features]

    # ==============================
    # 8. PREDICTION
    # ==============================
    prediction = int(model.predict(input_df)[0])
    proba = model.predict_proba(input_df)[0][1]
    confidence = proba if prediction == 1 else 1 - proba

    # ==============================
    # 9. RESULT
    # ==============================
    label = "Diabetic" if prediction == 1 else "Non-Diabetic"

    print("Prediction:", label)
    print("Probabilité:", proba)
    print(input_df)
    return {
        "prediction":prediction,
        "label":label,
        "proba":float(proba),
        "confidence":confidence
    }
