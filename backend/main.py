from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Dict
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from Src.predict import predict

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title='Dyscalculia Screening API',
    description='ML-based dyscalculia screening tool for primary school children in Pakistan',
    version='1.0.0'
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScreeningRequest(BaseModel):
    # student info
    grade: int = Field(..., ge=1, le=3, description='Grade 1, 2 or 3')
    age: int = Field(..., ge=5, le=12, description='Student age')
    
    # question scores (0, 0.5 or 1)
    scores: Dict[str, float] = Field(..., description='Q1 to Q24 scores')
    
    # raw response times in seconds
    response_times: Dict[str, float] = Field(..., description='Q1 to Q24 response times')
    
    # teacher and school data
    teacher_perception: int = Field(..., ge=0, le=1)
    math_performance: int = Field(..., ge=0, le=5)
    other_performance: int = Field(..., ge=0, le=5)
    
    # student feedback
    enjoyment: int = Field(..., ge=1, le=5)
    feeling: int = Field(..., ge=1, le=5)

class ScreeningResponse(BaseModel):
    risk_class: int
    risk_label: str
    description: str
    probabilities: dict
    confidence: float

@app.get('/')
def root():
    return {'message': 'Dyscalculia Screening API is running'}

@app.get('/health')
def health():
    return {'status': 'healthy'}

@app.post('/predict', response_model=ScreeningResponse)
def screen_student(request: ScreeningRequest):
    try:
        result = predict(
            scores=request.scores,
            response_times=request.response_times,
            grade=request.grade,
            age=request.age,
            teacher_perception=request.teacher_perception,
            enjoyment=request.enjoyment,
            feeling=request.feeling,
            math_performance=request.math_performance,
            other_performance=request.other_performance
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))