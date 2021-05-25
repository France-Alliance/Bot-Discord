from main import Alliance
import json

def GetAllianceAll(Local=False):
    if not Local:
        f = open(f"./data/Alliance.json", "w", encoding='utf8')
        f.write(json.dumps(Alliance(), indent=4))
        return True
    else:
        return Alliance()
        
def GetAlliance(ID, Option=None, Local=False):
    
    data = Alliance()['Alliance']
    for i in range(len(data)):
        if int(data[i]['ID']) == int(ID):
            if Option in data[i].keys():
                f = open(f"./data/Alliance-{ID}-{Option.lower()}.json", "w", encoding='utf8')
                f.write(json.dumps(data[i][Option], indent=4))
                return True
            elif Option == "Hubs":
                Hubs = []
                members = data[i]['Members']
                for elem in members:
                    for hubs in elem['Hubs']:
                        Hubs.append(hubs)
                f = open(f"./data/Alliance-{ID}-{Option.lower()}.json", "w", encoding='utf8')
                f.write(json.dumps({"Hubs": Hubs}, indent=4))
                return True
            elif Option == None:
                if not Local:
                    f = open(f"./data/Alliance-{ID}.json", "w", encoding='utf8')
                    f.write(json.dumps(data[i], indent=4))
                    return True
                elif Local:
                    return data[i]
        
def GetNameAlliance():
    data = Alliance()['Alliance']
    Name = []
    for elem in data:
        Name.append(elem['Name'])
        Name.append(elem['ID'])
    return Name

def GetNameMembers():
    data = Alliance()['Alliance']
    Name = []
    for elem in data:
        for el in elem['Members']:
            Name.append(el['Name'])
            Name.append(el['ID'])
    return Name

def GetMembers(ID, Option=None):
    if Option != None:
        if Option[0] in GetNameAlliance():
            for el in GetAlliance(Option[0], Local=True)['Members']:
                if el['ID'] == ID:
                    if len(Option) == 1 :
                        f = open(f"./data/Members-{ID}-{Option[0].lower()}.json", "w", encoding='utf8')
                        f.write(json.dumps(el, indent=4))
                        return True
                    elif len(Option) == 2:
                        if Option[1] in el.keys():
                            f = open(f"./data/Members-{ID}-{Option[0].lower()}-{Option[1].lower()}.json", "w", encoding='utf8')
                            f.write(json.dumps(el[Option[1]], indent=4))
                            return True
        elif not Option[0] in GetNameAlliance():
            data = Alliance()['Alliance']
        
            for all in data:
                for mem in all['Members']:
                    if mem['ID'] == ID:
                        f = open(f"./data/Members-{ID}-{Option[0].lower()}.json", "w", encoding='utf8')
                        f.write(json.dumps(mem[Option[0]], indent=4))
                        return True
    elif Option == None:
        data = Alliance()['Alliance']
        
        for all in data:
            for mem in all['Members']:
                if mem['ID'] == ID:
                    f = open(f"./data/Members-{ID}.json", "w", encoding='utf8')
                    f.write(json.dumps(mem, indent=4))
                    return True
