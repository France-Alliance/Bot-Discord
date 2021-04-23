from datetime import datetime
import json, dotenv, platform, os
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from Members import Member
from Profile import Profile
from Network import Network

options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-gpu")
options.add_argument("--log-level=1")
options.add_experimental_option('excludeSwitches', ['enable-logging'])

os.chdir(os.path.dirname(os.path.abspath(__file__)))
a = os.path.abspath('../.env')
SYSTEM_ENV = dotenv.dotenv_values(a)
#print(SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"], SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"])

if not os.path.exists('data'):
    os.mkdir('data')

URL = 'https://www.airlines-manager.com/'
# 2 Arguments (Tabs of Alliance (profile|members|network)/ ID Alliance)
URL_ALLIANCE_PROFIL = 'https://www.airlines-manager.com/alliance'
# 2ARguments (Tabs of Members (airline | network) / ID Members)
URL_MEMBERS_PROFIL = 'https://www.airlines-manager.com/company/profile'

date = datetime.now().strftime("%d-%m-%Y")

ALLIANCE_TABS = ["profile", "members", "network"]
ALLIANCE_LIST = [{"Name": "Aquila", "ID": 74365}, {
    "Name": "Pyxis", "ID": 88492}, {"Name": "Cygnus", "ID": 92914}]

email = SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"]
password = SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"]


starType = ["no", "bronze", "silver", "gold"]

path = "chromedriver"

if platform.node() == "OSchell-Laptop": #OSchell-Laptop || LAPTOP-KRONOSDEV
    path = SYSTEM_ENV["CHROMEDRIVER_PATH"]

# if platform.system() != "Windows":
#    path = os.path.abspath("chromedriver-v9.4.4-linux-x64/chromedriver")
def Alliance():
    if not os.path.exists(f"./data/{date}.json"):
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
            print(presence_of_element_located((By.XPATH, '//*[@id="mainHeader"]/div[2]')))
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

                    for tabs in ALLIANCE_TABS:
                        driver.get(f"{URL_ALLIANCE_PROFIL}/{tabs}/{id['ID']}")
                        if tabs == "profile":
                            if (wait.until(presence_of_element_located((By.CSS_SELECTOR, 'div#alliance_profile_statistiques')))):
                                result = Profile(driver, result)
                        elif tabs == "members":
                            if (wait.until(presence_of_element_located((By.CSS_SELECTOR, '#allianceMembersList > tbody > tr:nth-child(1) > th:nth-child(2) > span')))):
                                result = Member(driver, result)
                        elif tabs == "network":
                            if (wait.until(presence_of_element_located((By.CSS_SELECTOR, 'div#map_canvas')))):
                                result = Network(driver, result)
                    AllResult["Alliance"].append(result)

                with open(f"./data/{date}.json", "w", encoding='utf8') as f:
                    f.write(json.dumps(AllResult))
            return AllResult
                # Back previous page : driver.back()
    else:
        return json.load(open(f"./data/{date}.json", "r", encoding='utf8'))
    
Alliance()