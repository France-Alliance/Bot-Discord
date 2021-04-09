import os, re, sys, json
from datetime import datetime

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
    for elem in os.listdir("D:/Dev/Bot-Discord/NewScrapper/data/"):
        print(elem)
        if prog.match(elem) == None and elem != "Archive":
            os.remove(f"D:/Dev/Bot-Discord/NewScrapper/data/{elem}")
        elif elem != f'{datetime.now().strftime("%d-%m-%Y")}.json' and elem != "Archive":
            print("File Outdated", elem)
            NewName = minify(f"D:/Dev/Bot-Discord/NewScrapper/data/{elem}")
            os.rename(NewName, f"D:/Dev/Bot-Discord/NewScrapper/data/Archive/{elem.split('/')[-1]}")
            os.remove(f"D:/Dev/Bot-Discord/NewScrapper/data/{elem}")
RemoveFile()



