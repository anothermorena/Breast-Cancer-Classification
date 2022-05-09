# -*- coding: utf-8 -*-
"""
Created on Wed May 8 18:38:31 2022

@author: Otsogile Ogaisitse Onalepelo aka Morena

"""

#pip install fastapi uvicorn pickle in your virtual environment

#1. Library imports
import pickle
import uvicorn ##ASGI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from TumorData import TumorData

#2. Create the app object
app = FastAPI()

#add cross origin resource sharing
#these origins are the urls we want our api/backend to allow requests from
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#3. Load the  model pickle file into our app
pickle_in = open("../model/breast_cancer_classification_model.pickle","rb")

#4. Initialize our model
classifier = pickle.load(pickle_in)

#5. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
async def index():
    return {'message': 'Hello Machine Learning 😁'}


#6. Expose the prediction functionality, make a prediction from the passed
#   JSON data and return the predicted tumor class
@app.post('/predict')
async def predict_tumor_class(data:TumorData):

    """
        ## Making a prediction or classification requires the following:
        
        - mean_radius: float 
        - mean_perimeter: float
        - mean_area : float
        - mean_smoothness: float
        - mean_compactness: float
        - mean_concavity: float
        - mean_concave_points: float
        - radius_error: float
        - perimeter_error: float
        - area_error: float
        - concavity_error: float
        - concave_points_error: float
        - worst_radius: float
        - worst_texture: float
        - worst_perimeter: float
        - worst_area: float
        - worst_smoothness: float
        - worst_compactness: float
        - worst_concavity: float
        - worst_concave_points: float
    
    """
    #convert the incoming data to a dictionary
    data = data.dict()
    
    mean_radius = data['mean_radius']
    mean_perimeter = data['mean_perimeter']
    mean_area = data['mean_area']
    mean_smoothness = data['mean_smoothness']
    mean_compactness = data['mean_compactness']
    mean_concavity = data['mean_concavity']
    mean_concave_points = data['mean_concave_points']
    radius_error = data['radius_error']
    perimeter_error = data['perimeter_error']
    area_error = data['area_error']
    concavity_error = data['concavity_error']
    concave_points_error = data['concave_points_error']
    worst_radius = data['worst_radius']
    worst_texture = data['worst_texture']
    worst_perimeter = data['worst_perimeter']
    worst_area = data['worst_area']
    worst_smoothness = data['worst_smoothness']
    worst_compactness = data['worst_compactness']
    worst_concavity = data['worst_concavity']
    worst_concave_points = data['worst_concave_points']
  

    predicted__tumor_class = classifier.predict([[mean_radius,mean_perimeter,mean_area,mean_smoothness,mean_compactness,mean_concavity,mean_concave_points,radius_error,perimeter_error,area_error,concavity_error,concave_points_error,worst_radius,worst_texture,worst_perimeter,worst_area,worst_smoothness,worst_compactness,worst_concavity,worst_concave_points]])
    
    if (predicted__tumor_class[0] == 0):
        return {"prediction": "The Breast cancer is Malignant. Please enroll this patient for therapy or treament"}

    else:
       return {"prediction": "The Breast Cancer is Benign. Enroll this patient for therapy or treatment if symptoms start being problem 🙂"}
  



#7. Run the API with uvicorn
#   Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    
#or from the terminal with uvicorn main:app --reload

