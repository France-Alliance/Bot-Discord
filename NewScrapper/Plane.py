from datetime import datetime
import json
import dotenv
import platform
import os
from progress.bar import IncrementalBar as Bar
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

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

URL = 'https://www.airlines-manager.com/'
URL_AIRCRAFT = 'https://www.airlines-manager.com/aircraft/buy/new/0/'

date = datetime.now().strftime("%d-%m-%Y")

email = SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"]
password = SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"]

path = "chromedriver"

if platform.node() != "LAPTOP-KRONOSDEV":
    path = SYSTEM_ENV["CHROMEDRIVER_PATH"]

with webdriver.Chrome(executable_path=path, options=options) as driver:
    def connect():
        driver.find_element_by_id('username').send_keys(email)
        driver.find_element_by_id('password').send_keys(password)
        driver.find_element_by_id('loginSubmit').click()

    driver.get(URL)
    wait = WebDriverWait(driver, 10)
    connect()
    driver.get(URL_AIRCRAFT)

    tabs = ['short', 'middle', 'long', 'cargo']
    AllResult = {'short': [], 'middle': [], 'long': [], 'cargo': []}

    plane = {
        "Nom": None,
        "Constructeur": None,
        "Mise en service": None,
        "Rayon d'action": None,
        "Conso": None,
        "Usure": None,
        "Siege": None,
        "Tonnage": None,
        "Vitesse": None,
        "Prix": None
    }
    print()

    for t in tabs:
        driver.get(f"{URL_AIRCRAFT}{t}")
        result = []
        
        if (wait.until(presence_of_element_located((By.CLASS_NAME, 'aircraftPurchaseBox')))):
            bar = Bar(f'{t} : ', max=(len(driver.find_elements_by_class_name('aircraftPurchaseBox'))), suffix='%(percent).1f%% (%(index)d/%(max)d) - [%(elapsed_td)s / %(eta_td)s]')
            for i in range(1, len(driver.find_elements_by_class_name('aircraftPurchaseBox'))+1):
                resPlane = plane.copy()
                # Title
                title = str(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/div[2]/span[1]').text.replace("\n", ""))
                if "Cargo" in title:
                    title = str(driver.find_element_by_xpath(
                        f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/div[2]/span[2]').text.replace('\n', ''))

                # Name
                resPlane['Nom'] = title.split('/')[0].replace(' ', '')

                # Constructeur
                resPlane['Constructeur'] = title.split('/')[1].replace(' ', '')

                # Mise en service
                resPlane['Mise en service'] = int(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/form/div[1]/div[2]/ul[1]/li[1]/b').text.replace(' ', ''))

                # Rayon d'action
                resPlane["Rayon d'action"] = int(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/form/div[1]/div[2]/ul[1]/li[2]/b').text.replace(' ', '').replace('km', ''))

                # Conso
                resPlane["Conso"] = float(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/form/div[1]/div[2]/ul[1]/li[3]/b').text.replace('L/100km/pax', '').replace(' ', ''))

                # Usure
                resPlane["Usure"] = float(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/form/div[1]/div[2]/ul[1]/li[4]/b').text.replace('%/100h', '').replace(' ', ''))

                # Siege
                resPlane["Siege"] = int(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/form/div[1]/div[2]/ul[2]/li[1]/b').text.replace(' ', ''))

                # Tonnage
                resPlane["Tonnage"] = float(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/form/div[1]/div[2]/ul[2]/li[2]/b').text.replace(' ', ''))

                # Vitesse
                resPlane["Vitesse"] = int(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/form/div[1]/div[2]/ul[2]/li[3]/b').text.replace('km/h', '').replace(' ', ''))

                # Prix
                resPlane["Prix"] = int(driver.find_element_by_xpath(
                    f'//*[@id="aircraft_buyNew_step2"]/div[1]/div[2]/div[5]/div[{i}]/form/div[1]/div[3]/span[1]/strong').text.replace(' ', '').replace('$', ''))
                bar.next()
                result.append(resPlane)
                AllResult[t] = result
            bar.finish()
                
    
    with open(f"./Plane.json", "w", encoding='utf8') as f:
        f.write(json.dumps(AllResult))
