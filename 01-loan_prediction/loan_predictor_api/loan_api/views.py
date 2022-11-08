from django.shortcuts import render
from django.http import JsonResponse

import json

import pandas as pd

#import joblib
#model = joblib.load('modelPipeline.pkl')

def scoreJson(request):

    data = json.loads(request.body)

    dataframe = pd.DataFrame({'values': data}).T

    #score = model.predict_proba(dataframe)[:, -1][0]
    #score = float(score)
    score = 1.0

    print(dataframe.values)

    return JsonResponse({'score': score})

def scoreFile(request):
    return JsonResponse({'score': 1})


