# -*- coding: utf-8 -*-
"""
Created on Wed May 8 18:09:51 2022

@author: Otsogile Ogaisitse Onalepelo aka Morena

"""

from pydantic import BaseModel

#Object which describes a patient tumor attributes or features or fields
#this is deduced from the top 20 features we selected for our model
class TumorData(BaseModel):
    mean_radius: float 
    mean_perimeter: float
    mean_area : float
    mean_smoothness: float
    mean_compactness: float
    mean_concavity: float
    mean_concave_points: float
    radius_error: float
    perimeter_error: float
    area_error: float
    concavity_error: float
    concave_points_error: float
    worst_radius: float
    worst_texture: float
    worst_perimeter: float
    worst_area: float
    worst_smoothness: float
    worst_compactness: float
    worst_concavity: float
    worst_concave_points: float
    
    class Config():
        
        """
            ##This demonstrates how the different fields we are going to pass in should look like.
            ##It gives Front End Dev extra info on how to make the UI.
        
        """
        
        schema_extra = {
            "example":{
                "mean_radius": 22.1, 
                "mean_perimeter": 43.7,
                "mean_area" : 420.3,
                "mean_smoothness": 0.086,
                "mean_compactness": 0.13,
                "mean_concavity": 0.43,
                "mean_concave_points": 0.07,
                "radius_error": 1.17,
                "perimeter_error": 8.589,
                "area_error": 0.3,
                "concavity_error": 0.05,
                "concave_points_error": 0.01,
                "worst_radius": 24.8,
                "worst_texture": 0.69,
                "worst_perimeter": 0.66,
                "worst_area": 0.45,
                "worst_smoothness": 0.16,
                "worst_compactness": 0.86,
                "worst_concavity": 0.71,
                "worst_concave_points": 0.27
            }
        }
    
    