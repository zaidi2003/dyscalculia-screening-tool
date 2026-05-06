import pickle
import pandas as pd
import numpy as np
from Src.scoring import score_response_time
from Src.preprocessing import engineer_features
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(BASE_DIR, 'Model', 'model.pkl'), 'rb') as f:
    model = pickle.load(f)

with open(os.path.join(BASE_DIR, 'Model', 'scaler.pkl'), 'rb') as f:
    scaler = pickle.load(f)

FEATURE_ORDER = model.feature_names_in_.tolist()

def predict(
    scores: dict,
    response_times: dict,
    grade: int,
    age: int,
    teacher_perception: int,
    enjoyment: int,
    feeling: int,
    math_performance: int,
    other_performance: int
) -> dict:
    
    # score response times against threshold matrix
    time_scores = {
        q: score_response_time(q, grade, t) 
        for q, t in response_times.items()
    }
    
    # calculate performance gap
    performance_gap = math_performance - other_performance
    
    # engineer features
    features = engineer_features(
        scores, time_scores, grade, age,
        teacher_perception, enjoyment, 
        feeling, performance_gap
    )
    
    # create dataframe in correct feature order
    X = pd.DataFrame([features])[FEATURE_ORDER]
    
    # scale
    X_scaled = scaler.transform(X)
    
    # predict
    prediction = model.predict(X_scaled)[0]
    probability = model.predict_proba(X_scaled)[0][1]
    
    return {
        'at_risk': int(prediction),
        'probability': round(float(probability) * 100, 2),
        'risk_level': 'High' if probability > 0.7 else 
                      'Medium' if probability > 0.4 else 'Low'
    }