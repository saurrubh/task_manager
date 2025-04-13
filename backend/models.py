from pydantic import BaseModel

class Task(BaseModel):
    id: int
    title: str
    completed: bool

class TaskCreate(BaseModel):
    title: str

class UserCreate(BaseModel):
    username: str
    password: str