from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import HttpResponse
from django.contrib import messages
import datetime

from .forms import TaskForm
from .models import Task


def helloWorld(request):
    return HttpResponse('Hello World')

def yourName(request, name):
    return render(request, 'tasks/yourname.html', {'name': name})

@login_required
def taskList(request):

    search = request.GET.get('search')
    filter = request.GET.get('filter')
    taskDoneRecently = Task.objects.filter(done='done', updated_at__gt=datetime.datetime.now() - datetime.timedelta(days=30), user=request.user).count()
    taskDone = Task.objects.filter(done='done', user=request.user).count()
    taskDoing = Task.objects.filter(done='doing', user=request.user).count()

    if search:
        tasks = Task.objects.filter(title__icontains=search, user=request.user)

    elif filter:
        tasks = Task.objects.filter(done=filter, user=request.user)
    
    else:
        task_list = Task.objects.all().order_by('-created_at').filter(user=request.user)

        paginator = Paginator(task_list, 3)

        page = request.GET.get('page')

        tasks = paginator.get_page(page)

    return render(request, 'tasks/list.html', {'tasks': tasks, 'taskDoneRecently': taskDoneRecently, \
        'taskDone': taskDone, 'taskDoing': taskDoing})

@login_required
def taskView(request, id):
    task = get_object_or_404(Task, pk=id)
    return render(request, 'tasks/task.html', {'task': task})

@login_required
def newTask(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)

        if form.is_valid():
            task = form.save(commit=False)
            task.done = 'doing'
            task.user = request.user
            task.save()

            return redirect('/')

    form = TaskForm()
    return render(request, 'tasks/addtask.html', {'form': form})

@login_required
def editTask(request, id):
    task = get_object_or_404(Task, pk=id)
    form = TaskForm(instance=task)

    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)

        if form.is_valid():
            task.save()
            return redirect('/')
        else:
            return render(request, 'tasks/edittask.html', {'form': form, 'task': task})
    else:
        return render(request, 'tasks/edittask.html', {'form': form, 'task': task})

@login_required
def deleteTask(request, id):
    task = get_object_or_404(Task, pk=id)
    task.delete()

    messages.info(request, 'Tarefa deletada com sucesso.')

    return redirect('/')

@login_required
def changeStatus(request, id):
    task = get_object_or_404(Task, pk=id)

    print(task.done)

    if task.done == 'doing':
        task.done = 'done'
    else:
        task.done = 'doing'

    task.save()

    return redirect('/')
