import json, csv
from datetime import datetime

date = datetime.now().strftime("%d-%m-%Y")

fileInput = open(f"./data/{date}.json", "r")
fileOutput = open(f"./data/{date}.csv", "w")
data = json.load(fileInput)
fileInput.close()

output = csv.writer(fileOutput)

output.writerow(data["Alliance"])