import sys
from Search import GetAlliance, GetAllianceAll, GetNameAlliance, GetMembers, GetNameMembers

def VerifIDAlliance(ID):
    data = GetNameAlliance()
    for elem in data:
        if type(elem) == int:
            if ID == str(elem):
                return elem
        elif type(elem) == str:
            if elem == ID or (elem.replace('France ', '')) == ID:
                return data[data.index(elem)+1]

        
def VerifIDMembers(ID):
    data = GetNameMembers()
    for elem in data:
        if type(elem) == int:
            if ID == str(elem):
                return elem
        elif type(elem) == str:
            if elem == ID:
                return data[data.index(elem)+1]

if __name__ == "__main__":
    arg = sys.argv[1].split(' ')
    Type = str(arg[0])

    if Type == "--Alliance":
        ID = VerifIDAlliance(str(arg[1]))
        if len(arg) == 2:
            if GetAlliance(ID, Option=arg[2]):
                print(f"NewScrapper/data/Alliance-{ID}-{arg[2]}.json")
        elif len(arg) == 1:
            if GetAlliance(ID):
                print(f"NewScrapper/data/Alliance-{ID}.json")
    if Type == "--Members":
        ID = VerifIDMembers(str(arg[1]))
        print(arg, ID, VerifIDAlliance(arg[2]) in GetNameAlliance(), VerifIDAlliance(arg[2]))
        if len(arg) == 4:
            if GetMembers(ID, Option=[VerifIDAlliance(arg[2]), arg[3]]):
                print(f"NewScrapper/data/Members-{ID}-{VerifIDAlliance(arg[2])}-{arg[3]}.json")
        elif len(arg) == 3:
            if VerifIDAlliance(arg[2]) in GetNameAlliance():
                if GetMembers(ID, Option=[VerifIDAlliance(arg[2])]):
                    print(f"NewScrapper/data/Members-{ID}-{VerifIDAlliance(arg[2])}.json")
            else:
                if GetMembers(ID, Option=[arg[2]]):
                    print(f"NewScrapper/data/Members-{ID}-{arg[2]}.json")
        elif len(arg) == 2:
            if GetMembers(ID):
                print(f"NewScrapper/data/Members-{ID}.json")
    if Type == "--All":
        if GetAllianceAll():
            print(f"NewScrapper/data/Alliance.json")