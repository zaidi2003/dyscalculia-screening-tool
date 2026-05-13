import numpy as np

category_map = {
    'Counting': ['Q1', 'Q2'],
    'Subitising': ['Q3', 'Q4', 'Q24'],
    'Magnitude': ['Q5', 'Q6', 'Q10'],
    'Place Value': ['Q7', 'Q8', 'Q9', 'Q11'],
    'Number Line': ['Q12', 'Q13'],
    'Arithmetic': ['Q14', 'Q15'],
    'Fractions': ['Q16', 'Q17', 'Q18'],
    'Money': ['Q19', 'Q20', 'Q21'],
    'Time': ['Q22', 'Q23']
}

def engineer_features(scores: dict, time_scores: dict, 
                       grade: int, age: int,
                       teacher_perception: int,
                       enjoyment: int, feeling: int,
                       performance_gap: float) -> dict:
    features = {}
    
    # category score averages
    for category, questions in category_map.items():
        q_scores = [scores.get(q, 0) for q in questions]
        features[f'Score_{category}'] = np.mean(q_scores)
    
    # category time averages
    for category, questions in category_map.items():
        q_times = [time_scores.get(q, 3) for q in questions]
        features[f'Time_{category}'] = np.mean(q_times)
    
    # other features
    features['Grade'] = grade
    features['Age'] = age
    features['Teacher_Perception_Math'] = teacher_perception
    features['Enjoyment_Score'] = enjoyment
    features['Student_Feeling'] = feeling
    features['Performance Gap'] = performance_gap
    
    return features