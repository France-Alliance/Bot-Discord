from datetime import datetime
from pandas import DataFrame
import platform
import pandas
import json
import os

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
if platform.node() == "raspberrypi":
    file = open(os.path.abspath(f"bot_essentials/scrapper/scrap_essentials/data/{date}.json"), 'r')
else:
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
    if platform.node() == "raspberrypi":
        name = f'bot_essentials/compagnon_scripts/csv_data/XCEL{kb}.csv'
    else:
        name = f'../../bot_essentials/compagnon_scripts/csv_data/XCEL{kb}.csv'
       
    DataFrame(C[i]).to_csv(os.path.abspath(name), index=None, encoding='utf-8', sep=';')
