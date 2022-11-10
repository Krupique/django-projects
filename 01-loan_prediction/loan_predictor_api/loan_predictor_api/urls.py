from django.contrib import admin
from django.urls import path
from loan_api import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("admin/", admin.site.urls),
    path("scoreJson/", csrf_exempt(views.scoreJson), name='score-json'),
    path("scoreFile/", csrf_exempt(views.scoreFile), name='score-json')
]
