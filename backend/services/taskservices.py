from backend.models import Task, TaskCreate
from backend.fileio import read_tasks_from_file, write_tasks_to_file
from fastapi import HTTPException

def get_all_tasks():
    return read_tasks_from_file()

def create_task(task_data: TaskCreate):
    tasks = read_tasks_from_file()
    new_task = Task(id=len(tasks) + 1, title=task_data.title, completed=False)
    tasks.append(new_task.dict())
    write_tasks_to_file(tasks)
    return new_task

def complete_task_by_id(task_id: int):
    tasks = read_tasks_from_file()
    task = next((task for task in tasks if task["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task["completed"] = True
    write_tasks_to_file(tasks)
    return task

def delete_task_by_id(task_id: int):
    tasks = read_tasks_from_file()
    task = next((task for task in tasks if task["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    tasks.remove(task)
    write_tasks_to_file(tasks)
