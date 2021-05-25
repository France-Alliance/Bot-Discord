import os, re, sys, json
from datetime import datetime

os.chdir(os.path.dirname(os.path.abspath(__file__)))
if not os.path.exists('data/Archive'):
    os.mkdir('data/Archive')

def minify(file_name):
    file_data = open(file_name, "r", 1).read()
    json_data = json.loads(file_data)
    json_string = json.dumps(json_data, separators=(',', ":"))
    file_name = str(file_name).replace(".json", "")
    new_file_name = f"{file_name}_minify.json"
    open(new_file_name, "w+", 1).write(json_string)
    return new_file_name

def RemoveFile():
    prog = re.compile("\d{2}-\d{2}-\d{4}.json") 
    for elem in os.listdir("data/"):
        print(elem)
        if prog.match(elem) == None and elem != "Archive":
            os.remove(f"data/{elem}")
        elif elem != f'{datetime.now().strftime("%d-%m-%Y")}.json' and elem != "Archive":
            print("File Outdated", elem)
            NewName = minify(f"data/{elem}")
            os.rename(NewName, f"data/Archive/{elem.split('/')[-1]}")
            os.remove(f"data/{elem}")
RemoveFile()



