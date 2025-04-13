from fastapi import APIRouter, Depends, HTTPException
from typing import List
from auth import get_current_user
from models import Task, TaskCreate
from services.taskservices import (
    get_all_tasks, create_task, complete_task_by_id, delete_task_by_id
)

router = APIRouter(tags=["tasks"])

@router.get("/tasks", response_model=List[Task])
def read_tasks(token: str = Depends(get_current_user)):
    return get_all_tasks()

@router.post("/tasks", response_model=Task)
def add_task(task: TaskCreate, token: str = Depends(get_current_user)):
    return create_task(task)

@router.patch("/tasks/{task_id}", response_model=Task)
def complete_task(task_id: int, token: str = Depends(get_current_user)):
    return complete_task_by_id(task_id)

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, token: str = Depends(get_current_user)):
    delete_task_by_id(task_id)
    return {"message": "Task deleted successfully"}
