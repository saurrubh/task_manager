import json
import os

TASKS_FILE = "tasks.json"
USERS_FILE = "users.json"

def read_tasks_from_file():
    if not os.path.exists(TASKS_FILE):
        return []
    with open(TASKS_FILE, "r") as file:
        return json.load(file)

def write_tasks_to_file(tasks):
    with open(TASKS_FILE, "w") as file:
        json.dump(tasks, file, indent=4)

def read_users_from_file():
    if not os.path.exists(USERS_FILE):
        return []
    with open(USERS_FILE, "r") as file:
        return json.load(file)

def write_users_to_file(users):
    with open(USERS_FILE, "w") as file:
        json.dump(users, file, indent=4)