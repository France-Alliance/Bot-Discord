from pandas import DataFrame
import pandas
import json
from datetime import datetime
import os
# ------------
"""

# ligne puis colonnne
file = open('C:/Users/O\'Schell wokspace/Google Drive/Famille/Schell/Gaby/For fun/Code/Projects/NodeJS/AM2_Discord_Bot/a.csv', 'r')
lc = 1
for ligne in file:
    print("ligne ", lc)
    ligne = ligne.split(";")
    cc = 1
    for colonne in ligne:
        print("colonne ", cc)
        print(colonne)
        cc += 1
    lc += 1

"""
# ------------
c = [
    [
        "Alliance",
        "ID",
        "Rank",
        "Creation date",
        "Nbr compagnie",
        "Solde",
        "Benefice hebdo",
        "Taxe hebdo",
        "Available hubs",
        "Shared Km",
        "Taxe line",
        "Taxe companies",
        "Taxe compagnies",
        "Nbr available plane",
        "Max reduction",
        "Reduc on 30d",
        "Nbr bought plane",
        "Max buying help",
        "Buy help 30d",
        "Nbr bought plane"
    ],
    [
        "Alliance",
        "Compagnie",
        "ID",
        "Nbr star(s)",
        "Type of star(s)",
        "Director's name",
        "Hubs",
        "Role(s)",
        "Valorisation",
        "Solde",
        "Last connection"
    ]
]

C = [{}, {}]

global al
al = []

date = datetime.now().strftime("%d-%m-%Y")

file = open(os.path.abspath(f"../../bot_essentials/scrapper/scrap_essentials/data/{date}.json"), 'r')

Alliances = json.load(file).get("Alliance")


def dt(alli, lege):

    for n in range(len(al)):
        if al.index(al[n]) == alli:
            print(f"Alliance: {al[n]}")


for alliance in Alliances:
    al.append(alliance.get("Name"))

for n in range(len(C)):
    # c = légende du tableur
    # n(number) = 0 then 1
    # l(liste) = d[0] then d[1]
    d = C[n]
    s_d = len(d)
    # On a notre dataframe et on prend la bonne liste de légende
    l = c[n]
    s_l = len(l)
    # On a notre dataframe et on a la liste de légende
    for i in range(s_l):
        temp = []
        for alliance in Alliances:
            if n == 0:
                if l.index(l[i]) == 0:
                    temp.append(alliance.get("Name"))
                if l.index(l[i]) == 1:
                    temp.append(alliance.get("ID"))
                if l.index(l[i]) == 2:
                    temp.append(alliance.get("Classement"))
                if l.index(l[i]) == 3:
                    temp.append(alliance.get("Profile").get("General").get("Created"))
                if l.index(l[i]) == 4:
                    temp.append(alliance.get("Profile").get("General").get("nbCompanies"))
                if l.index(l[i]) == 5:
                    temp.append(alliance.get("Profile").get("General").get("Solde"))
                if l.index(l[i]) == 6:
                    temp.append(alliance.get("Profile").get("General").get("BeneficeHebdo"))
                if l.index(l[i]) == 7:
                    temp.append(alliance.get("Profile").get("General").get("TaxeHebdo"))
                if l.index(l[i]) == 8:
                    temp.append(alliance.get("Profile").get("Hub").get("HubsDispo"))
                if l.index(l[i]) == 9:
                    temp.append(alliance.get("Profile").get("Hub").get("KmPartage"))
                if l.index(l[i]) == 10:
                    temp.append(alliance.get("Profile").get("Hub").get("TaxeLigne"))
                if l.index(l[i]) == 11:
                    temp.append(alliance.get("Profile").get("Hub").get("TaxeCompanies"))
                if l.index(l[i]) == 12:
                    temp.append(alliance.get("Profile").get("Hub").get("TaxeCompagnies"))
                if l.index(l[i]) == 13:
                    temp.append(alliance.get("Profile").get("AG").get("nbAvionProposer"))
                if l.index(l[i]) == 14:
                    temp.append(alliance.get("Profile").get("AG").get("ReducMax"))
                if l.index(l[i]) == 15:
                    temp.append(alliance.get("Profile").get("AG").get("Reduc30j"))
                if l.index(l[i]) == 16:
                    temp.append(alliance.get("Profile").get("AG").get("nbAvionAcheter"))
                if l.index(l[i]) == 17:
                    temp.append(alliance.get("Profile").get("AG").get("AideAchatMax"))
                if l.index(l[i]) == 18:
                    temp.append(alliance.get("Profile").get("AG").get("AideAchat30j"))
                if l.index(l[i]) == 19:
                    temp.append(alliance.get("Profile").get("AG").get("nbAvionAchter"))
                
                print(f"temp #0: {temp}")
            #d[str(l[i])] = temp
            elif n == 1:
                for m in alliance.get("Members"):
                    if l.index(l[i]) == 0:
                        temp.append(alliance.get("Name"))
                    if l.index(l[i]) == 1:
                        temp.append(m.get("Name"))
                    if l.index(l[i]) == 2:
                        temp.append(m.get("ID"))
                    if l.index(l[i]) == 3:
                        temp.append(m.get("Star").get("Nombre"))
                    if l.index(l[i]) == 4:
                        temp.append(m.get("Star").get("Type"))
                    if l.index(l[i]) == 5:
                        temp.append(m.get("Owner"))
                    if l.index(l[i]) == 6:
                        temp.append(m.get("Hubs"))
                    if l.index(l[i]) == 7:
                        temp.append(m.get("Role"))
                    if l.index(l[i]) == 8:
                        temp.append(m.get("Valorisation"))
                    if l.index(l[i]) == 9:
                        temp.append(m.get("Solde"))
                    if l.index(l[i]) == 10:
                        temp.append(m.get("LastConnection"))
                    print(f"temp #1: {temp}")
            d[str(l[i])] = temp
            #print(d[str(l[i])])

for i in range(2):
    kb = i+1
    print(DataFrame(C[i]))
    for valeur in C[i]:
       print(f"Size {valeur}: {len(C[i].get(valeur))}")
       
    DataFrame(C[i]).to_csv(os.path.abspath(f'../../bot_essentials/compagnon_scripts/csv_data/XCEL{kb}.csv'), index=None, encoding='utf-8', sep=';')
    #pandas.read_csv(f'XCEL{kb}.csv')

"""
for alliance in Alliances:
    data[0].append([])

    print()
    print(f"data[0]: {data[0]}")
    print()

    data[0][nb_a].append(alliance.get("Name"))
    al.append(alliance.get("Name"))
    data[0][nb_a].append(alliance.get("ID"))
    data[0][nb_a].append(alliance.get("Classement"))

    general = alliance.get("Profile").get("General")
    for valeur in general.values():
       data[0][nb_a].append(valeur)

    hub = alliance.get("Profile").get("Hub")
    for valeur in hub.values():
       data[0][nb_a].append(valeur)

    ag = alliance.get("Profile").get("AG")
    for valeur in ag.values():
       data[0][nb_a].append(valeur)

    net_stat = alliance.get("Networks").get("Statistique")
    for valeur in net_stat.values():
       data[0][nb_a].append(valeur)
    
    data[0][nb_a].append(alliance.get("Profile").get("R&D"))

    print()
    print(f"data[0] #2: {data[0]}")
    print()

    nb_a+=1

nb_a=0
for alliance in Alliances:
    data[1].append([])

    print()
    print(f"data[1]: {data[1]}")
    print()

    data[1][nb_a].append(alliance.get("Name"))

    members = alliance.get("Members")
    for member in members:
        print(f"member: {member}")
        for mbr_key in member:
            temp=[]


            print(f"mbr_key: {mbr_key}")
            if mbr_key == "Star" :
                    star = member.get("Star")
                    for valeur in star.values():
                        #print(f"star: {valeur}")
                        temp.append(valeur)
                    data[1][nb_a].append(temp)
            elif mbr_key == "Hubs" : 
                    hubs = member.get("Hubs")
                    for valeur in hubs:
                        print(f"hub: {valeur}")
                        temp.append(valeur)
                    data[1][nb_a].append(temp)
        

            #data[1][nb_a].append(valeur)
            #print(f"valeur: {mbr_key}")
        


    print()
    print(f"data[1] #2: {data[1]}")
    print()

    nb_a+=1
    
#print(data[0])


for j in range(len(al)):
        print(data[0][j])



for h in range(len(c)):
    l = c[h]
    s_l = len(l)
    #print("Data Frame: ",h)
    for i in range(len(l)):
        temp = []
        l2 = l[i]
        name = "c"+str(i)
        temp.append([l2][0])
        #print("Colonne: ",i)
        for j in range(len(al)):
            temp.append(data[h][j][i])
            #print("Ligne: ",j,"=>",data[h][j][i],f"({temp})")
        C[h][f"{name}"] = temp
        
        #print(f"C[{h}]: ",C[h])
        
        

for k in range(2):
    kb = k+1
    #print(f"C[{k}]: ",C[k])
    DataFrame(C[k]).to_csv(f'XCEL{kb}.csv', index=None, header=False, encoding='utf-8', sep=';')
"""
