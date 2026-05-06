import pandas as pd
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
threshold_df = pd.read_csv(os.path.join(BASE_DIR, 'Data', 'threshold_matrix.csv'))

def score_response_time(question: str, grade: int, response_time: float) -> int:
    row = threshold_df[threshold_df['Question'] == question]
    if row.empty:
        return 3  # default to average if question not found
    
    p10 = row[f'Grade{grade}_p10'].values[0]
    p30 = row[f'Grade{grade}_p30'].values[0]
    p70 = row[f'Grade{grade}_p70'].values[0]
    p90 = row[f'Grade{grade}_p90'].values[0]
    
    if response_time < p10:
        return 1   # Way Above Avg
    elif response_time < p30:
        return 2   # Slightly Above Avg
    elif response_time < p70:
        return 3   # Average
    elif response_time < p90:
        return 4   # Slightly Below Avg
    else:
        return 5   # Way Below Avg