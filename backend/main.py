# from fastapi import FastAPI, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from fastapi.middleware.cors import CORSMiddleware
# from typing import List
# from pydantic import BaseModel
# import json
# import os
# import backend.auth as auth
# from backend.models import Task, TaskCreate
# from backend.fileio import read_tasks_from_file,write_tasks_to_file

# app = FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# # Dependency to get the current user from the token
# def get_current_user(token: str = Depends(oauth2_scheme)):
#     return auth.get_current_user(token)

# # Endpoint to log in and get a JWT token
# @app.post("/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = auth.authenticate_user(form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#         )
#     access_token = auth.create_access_token(data={"sub": form_data.username})
#     return {"access_token": access_token, "token_type": "bearer"}

# # Endpoint to add a new task (authentication required)
# @app.post("/tasks", response_model=Task)
# def add_task(task: TaskCreate, token: str = Depends(oauth2_scheme)):
#     tasks = read_tasks_from_file()
#     print(tasks)
#     new_task = Task(id=len(tasks) + 1, title=task.title, completed=False)
#     print(new_task)
#     tasks.append(new_task.dict())
#     write_tasks_to_file(tasks)
#     return new_task

# # Endpoint to view all tasks (authentication required)
# @app.get("/tasks", response_model=List[Task])
# def get_tasks(token: str = Depends(oauth2_scheme)):
#     tasks = read_tasks_from_file()
#     return tasks

# # Endpoint to mark a task as completed (authentication required)
# @app.patch("/tasks/{task_id}", response_model=Task)
# def complete_task(task_id: int, token: str = Depends(oauth2_scheme)):
#     tasks = read_tasks_from_file()
#     task = next((task for task in tasks if task["id"] == task_id), None)
#     if task is None:
#         raise HTTPException(status_code=404, detail="Task not found")
#     task["completed"] = True
#     write_tasks_to_file(tasks)
#     return task

# # Endpoint to delete a task (authentication required)
# @app.delete("/tasks/{task_id}")
# def delete_task(task_id: int, token: str = Depends(oauth2_scheme)):
#     tasks = read_tasks_from_file()
#     task = next((task for task in tasks if task["id"] == task_id), None)
#     if task is None:
#         raise HTTPException(status_code=404, detail="Task not found")
#     tasks.remove(task)
#     write_tasks_to_file(tasks)
#     return {"message": "Task deleted successfully"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import login, tasks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login.router)
app.include_router(tasks.router)

