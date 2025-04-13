import json
import os

TASKS_FILE = "tasks.json"


def read_tasks_from_file():
    if not os.path.exists(TASKS_FILE):
        return []
    with open(TASKS_FILE, "r") as file:
        return json.load(file)

# Write the tasks to the JSON file
def write_tasks_to_file(tasks):
    with open(TASKS_FILE, "w") as file:
        print(tasks,file)
        json.dump(tasks, file, indent=4)