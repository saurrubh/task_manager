import json
import os

TASKS_FILE = "tasks.json"
USERS_FILE = "users.json"

def read_tasks_from_file():
    if not os.path.exists(TASKS_FILE):
        return []
    try:
        with open(TASKS_FILE, "r") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error reading {TASKS_FILE}: {str(e)}") 
        return []

def write_tasks_to_file(tasks):
    try:
        os.makedirs(os.path.dirname(TASKS_FILE) or ".", exist_ok=True)
        with open(TASKS_FILE, "w") as file:
            json.dump(tasks, file, indent=4)
    except Exception as e:
        print(f"Error writing to {TASKS_FILE}: {str(e)}") 
        raise Exception(f"Failed to write to {TASKS_FILE}: {str(e)}")

def read_users_from_file():
    if not os.path.exists(USERS_FILE):
        return []
    try:
        with open(USERS_FILE, "r") as file:
            return json.load(file)
    except Exception as e:
        print(f"Error reading {USERS_FILE}: {str(e)}")  
        return []

def write_users_to_file(users):
    try:
        os.makedirs(os.path.dirname(USERS_FILE) or ".", exist_ok=True)
        with open(USERS_FILE, "w") as file:
            json.dump(users, file, indent=4)
    except Exception as e:
        print(f"Error writing to {USERS_FILE}: {str(e)}") 
        raise Exception(f"Failed to write to {USERS_FILE}: {str(e)}")