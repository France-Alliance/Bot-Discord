from datetime import datetime
import json
import dotenv
import platform
import os
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")

SYSTEM_ENV = dotenv.dotenv_values('../.env')

URL = 'https://www.airlines-manager.com/'
# 2 Arguments (Tabs of Alliance (profile|members|network)/ ID Alliance)
URL_ALLIANCE_PROFIL = 'https://www.airlines-manager.com/alliance'
# 2ARguments (Tabs of Members (airline | network) / ID Members)
URL_MEMBERS_PROFIL = 'https://www.airlines-manager.com/company/profile'

date = datetime.now().strftime("%d-%m-%Y")

ALLIANCE_TABS = ["profile", "members", "network"]
ALLIANCE_LIST = [{"Name": "Aquila", "ID": 74365}, {
    "Name": "Pyxis", "ID": 88492}, {"Name": "Cygnus", "ID": 92914}]

print(SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"], SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"])
email = SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"]
password = SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"]

starType = ["no", "bronze", "silver", "gold"]

path = "chromedriver"

if platform.system() != "Windows":
    path = os.path.abspath("chromedriver-v9.4.4-linux-x64/chromedriver")

with webdriver.Chrome(executable_path=path, options=options) as driver:
    def connect():
        driver.find_element_by_id('username').send_keys(email)
        driver.find_element_by_id('password').send_keys(password)
        driver.find_element_by_id('loginSubmit').click()

    driver.get(URL)
    wait = WebDriverWait(driver, 10)
    connect()
    driver.get("https://www.airlines-manager.com/home")
    AllResult = {"Alliance": []}
    if (wait.until(presence_of_element_located((By.XPATH, '//*[@id="mainHeader"]/div[2]')))):
        for id in ALLIANCE_LIST:
            result = {"Name": None, "ID": None, "Classement": None,
                      "Profile": {
                          "General": {"Created": None, "nbCompanies": None, "Solde": None, "BeneficeHebdo": None, "TaxeHebdo": None},
                          "Hub": {"HubsDispo": None, "KmPartage": None, "TaxeLigne": None, "TaxeCompanies": None},
                          "AG": {"nbAvionProposer": None, "ReducMax": None, "Reduc30j": None, "nbAvionAcheter": None, "AideAchatMax": None, "AideAchat30j": None},
                          "R&D": None
                      },
                      "Members": [
                          # PatternMembers Here
                      ],
                      "Networks": {
                          "Statistique": {
                              "NbrHub": None,
                              "NbrLigne": None,
                              "KmLigne": None,
                          },
                          "Hubs": [

                          ]
                      }
                      }

            patternMembers = {"Name": None, "Star": "Hard Work in Here !!! (Soon)",
                              "Owner": None, "Hubs": [], "Role": None}
            patternHubs = {"IATA": None, "DemandPartage": None, "NbLigne": None,
                           "KmLigne": None, "NbKmAutoriser": None, "KmRestant": None, "Benefices": None}
            star = {"Nombre": None, "Type": None}

            for tabs in ALLIANCE_TABS:
                driver.get(f"{URL_ALLIANCE_PROFIL}/{tabs}/{id['ID']}")
                if tabs == "profile":
                    if (wait.until(presence_of_element_located((By.CSS_SELECTOR, 'div#alliance_profile_statistiques')))):
                        result["Name"] = driver.find_element_by_xpath(
                            '//*[@id="alliance_profile"]/div[1]/div[2]/ul/li[1]/b').text
                        result["ID"] = int(id['ID'])
                        result["Classement"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile"]/div[1]/div[3]/ul/li[4]').text.replace(" ", ""))
                        Profile = result["Profile"]
                        Profile["General"]["Created"] = driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[1]/td[1]/div/span[2]/span').text
                        Profile["General"]["nbCompanies"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[2]/td[1]/div/span[2]/span').text)
                        Profile["General"]["Solde"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[2]/td[2]/div/span[2]/span').text.replace(" ", "").replace("$", ""))
                        Profile["General"]["BeneficeHebdo"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[3]/td[1]/div/span[2]/span').text.replace(" ", "").replace("$", ""))
                        Profile["General"]["TaxeHebdo"] = float(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_infos"]/tbody/tr[1]/td[2]/div/span[2]/span').text.split(" ")[0].replace("%", "").replace(",", "."))
                        Profile["Hub"]["HubsDispo"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[1]/td[1]/div/span[2]/span').text)
                        Profile["Hub"]["KmPartage"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[2]/td[1]/div/span[2]').text.replace(" ", "").replace("km", "").replace(",", "."))
                        Profile["Hub"]["TaxeLigne"] = float(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[1]/td[2]/div/span[2]').text.split(" ")[0].replace("%", "").replace(",", "."))
                        Profile["Hub"]["TaxeCompagnies"] = float(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[2]/td[2]/div/span[2]/span').text.split(" ")[0].replace("%", "").replace(",", "."))
                        Profile["AG"]["nbAvionProposer"] = driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[1]/td[1]/div/span[2]/span').text
                        Profile["AG"]["ReducMax"] = float(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[2]/td[1]/div/span[2]/span').text.replace(" %", "").replace(",", "."))
                        Profile["AG"]["Reduc30j"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[3]/td[1]/div/span[2]/span').text.replace(" ", "").replace("$", ""))
                        Profile["AG"]["nbAvionAchter"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[1]/td[2]/div/span[2]').text)
                        Profile["AG"]["AideAchatMax"] = float(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[2]/td[2]/div/span[2]/span').text.replace(" %", "").replace(",", "."))
                        Profile["AG"]["AideAchat30j"] = driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_sells"]/tbody/tr[3]/td[2]/div/span[2]/span').text
                        Profile["R&D"] = int(driver.find_element_by_xpath(
                            '//*[@id="alliance_profile_statistiques_general_research"]/tbody/tr/td[1]/div/div/div').get_attribute('title').replace("%", ""))
                elif tabs == "members":
                    if (wait.until(presence_of_element_located((By.CSS_SELECTOR, '#allianceMembersList > tbody > tr:nth-child(1) > th:nth-child(2) > span')))):
                        for i in range(2, len(driver.find_elements_by_css_selector('#allianceMembersList > tbody > tr'))):
                            patternMembersCopy = patternMembers.copy()
                            patternMembersCopy["Name"] = driver.find_element_by_xpath(
                                f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[1]').text
                            starCopy = star.copy()

                            for j in range(1, 6):
                                # print(f"{patternMembersCopy['Name']} : {starCopy}")
                                typestar = str(driver.find_element_by_xpath(
                                    f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[2]/span[{j}]').get_attribute('class').split(" ")[2].replace("StarSmall", ""))
                                if starCopy == star:
                                    starCopy["Nombre"] = j
                                    starCopy["Type"] = typestar
                                elif typestar == starCopy["Type"]:
                                    starCopy["Nombre"] = j
                                else:
                                    break

                            patternMembersCopy["Star"] = starCopy
                            patternMembersCopy["Owner"] = driver.find_element_by_xpath(
                                f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[3]').text
                            patternMembersCopy["Hubs"] = driver.find_element_by_xpath(
                                f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[4]').text.replace(" ", "").replace("\n", "").split("/")
                            if driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[5]/ul').text != "":
                                patternMembersCopy["Role"] = driver.find_element_by_xpath(
                                    f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[5]/ul/li').text
                            else:
                                patternMembersCopy["Role"] = driver.find_element_by_xpath(
                                    f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[5]/ul').text
                            del patternMembersCopy["Hubs"][len(
                                patternMembersCopy["Hubs"])-1]
                            result["Members"].append(patternMembersCopy)
                elif tabs == "network":
                    if (wait.until(presence_of_element_located((By.CSS_SELECTOR, 'div#map_canvas')))):
                        for i in range(2, len(driver.find_elements_by_css_selector('#alliance_profile > table > tbody > tr'))):
                            patternHubsCopy = patternHubs.copy()
                            result["Networks"]["Statistique"]["NbrHub"] = int(driver.find_element_by_xpath(
                                f'//*[@id="alliance_profile"]/div[4]/div[1]/div[1]/span[2]/span').text)
                            result["Networks"]["Statistique"]["NbrLigne"] = int(driver.find_element_by_xpath(
                                f'//*[@id="alliance_profile"]/div[4]/div[1]/div[2]/span[2]/span').text)
                            result["Networks"]["Statistique"]["KmLigne"] = int(driver.find_element_by_xpath(
                                f'//*[@id="alliance_profile"]/div[4]/div[1]/div[3]/span[2]/span').text.replace(" ", "").replace("km", ""))
                            if (int(driver.find_element_by_xpath(f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[3]/div[2]').text.replace(" ", "").replace("\n", "").replace("km", "")) != 0):
                                patternHubsCopy["IATA"] = driver.find_element_by_xpath(
                                    f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[1]').text.replace(" ", "").replace("\n", "").replace("/", "")
                                patternHubsCopy["DemandPartage"] = float(driver.find_element_by_xpath(
                                    f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[2]').text.replace(" ", "").replace("%", "").replace(",", "."))
                                patternHubsCopy["KmLigne"] = int(driver.find_element_by_xpath(
                                    f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[3]/div[2]').text.replace(" ", "").replace("\n", "").replace("km", ""))
                                patternHubsCopy["NbLigne"] = int(driver.find_element_by_xpath(
                                    f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[3]/div[1]').text.replace(" ", "").replace("\n", ""))
                                patternHubsCopy["NbKmAutoriser"] = int(driver.find_element_by_xpath(
                                    f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[4]').text.replace(" ", "").replace("km", ""))
                                patternHubsCopy["KmRestant"] = float(driver.find_element_by_xpath(
                                    f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[5]').text.replace(" ", "").replace("%", "").replace(",", "."))
                                patternHubsCopy["Benefices"] = int(driver.find_element_by_xpath(
                                    f'//*[@id="alliance_profile"]/table/tbody/tr[{i}]/td[6]').text.replace(" ", "").replace("$", ""))
                                result["Networks"]["Hubs"].append(
                                    patternHubsCopy)

            AllResult["Alliance"].append(result)
        # print(json.dumps(AllResult))

        with open(f"./data/{date}.json", "w", encoding='utf8') as f:
            f.write(json.dumps(AllResult))

        # Back previous page : driver.back()
