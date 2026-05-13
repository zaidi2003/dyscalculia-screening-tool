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

# class label mapping
RISK_LABELS = {
    0: 'No Risk',
    1: 'Moderate Risk',
    2: 'Severe Risk'
}

RISK_DESCRIPTIONS = {
    0: 'No significant indicators of dyscalculia detected.',
    1: 'Some indicators of dyscalculia present. Further evaluation advised.',
    2: 'Strong indicators of dyscalculia detected. Immediate assessment recommended.'
}

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
    X_scaled = pd.DataFrame(scaler.transform(X),columns=X.columns)
    
    # predict class and probabilities
    prediction = int(model.predict(X_scaled)[0])
    probabilities = model.predict_proba(X_scaled)[0]
    
    # get probability for each class
    prob_no_risk = round(float(probabilities[0]) * 100, 2)
    prob_moderate = round(float(probabilities[1]) * 100, 2)
    prob_severe = round(float(probabilities[2]) * 100, 2)
    
    return {
        'risk_class': prediction,
        'risk_label': RISK_LABELS[prediction],
        'description': RISK_DESCRIPTIONS[prediction],
        'probabilities': {
            'no_risk': prob_no_risk,
            'moderate_risk': prob_moderate,
            'severe_risk': prob_severe
        },
        'confidence': round(float(probabilities[prediction]) * 100, 2)
    }