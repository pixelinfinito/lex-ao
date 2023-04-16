"""
This script performs the following tasks:

1. Navigates to the /docs directory under the root directory.
2. Recursively goes through the folders and sub-folders in the directory and checks their names.
3. If a folder name appears to be a year in the "YYYY" format, the script opens the _category_.json file in that folder.
4. The script reads the "position" key from the JSON object in the file (if it exists).
5. The script subtracts the current year from the folder's name year (YYYY) and updates the "position" value with the result of the subtraction.
6. If no folders are found, or if the _category_.json file is not found, the script ignores the folder and continues processing.

Note: Update the 'current_year' variable in the update_position() function as needed.
"""

import os
import json
from pathlib import Path

def update_position(folder_year):
    current_year = 2023  # You may want to update this as needed
    position = current_year - folder_year
    return position

def process_directory(directory_path):
    for root, dirs, files in os.walk(directory_path):
        for dir_name in dirs:
            if dir_name.isdigit() and len(dir_name) == 4:
                year = int(dir_name)
                category_json_path = Path(root) / dir_name / "_category_.json"
                
                if category_json_path.is_file():
                    with open(category_json_path, 'r') as json_file:
                        data = json.load(json_file)

                    if "position" in data:
                        data["position"] = update_position(year)

                        with open(category_json_path, 'w') as json_file:
                            json.dump(data, json_file, indent=4)

def main():
    initial_script_path = Path(os.path.abspath(__file__)).parent
    project_root = initial_script_path.parent
    docs_directory = project_root / "docs"
    if os.path.isdir(docs_directory):
        process_directory(docs_directory)
    else:
        print(f"Directory '{docs_directory}' not found.")

if __name__ == "__main__":
    main()

