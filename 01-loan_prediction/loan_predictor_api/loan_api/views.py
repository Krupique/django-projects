from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage

import sklearn

import json

import pandas as pd

import joblib
model = joblib.load('ml_model/modelPipeline-1.pkl')

def scoreJson(request):

    data = json.loads(request.body)

    dataframe = pd.DataFrame({0: data}).T

    score = model.predict_proba(dataframe)[:, -1][0]
    score = float(score)

    return JsonResponse({'score': score})

def scoreFile(request):
    fileObj=request.FILES['filePath']
    fs=FileSystemStorage()
    filePathName=fs.save(fileObj.name,fileObj)
    filePathName=fs.url(filePathName)
    filePath='.'+filePathName

    #columns =['Credit_History', 'LoanAmount', 'ApplicantIncome', 'CoapplicantIncome', 'Dependents']

    data =pd.read_csv(filePath)
    #data = data[columns]

    score=model.predict_proba(data)[:,-1]

    score={j:k for j,k in zip(data['Loan_ID'],score)}

    score =sorted(score.items(),key=lambda x: x[1],reverse=True)

    return JsonResponse({'result':score})


