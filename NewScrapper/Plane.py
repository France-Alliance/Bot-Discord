from datetime import datetime
import json
import dotenv
import platform
import os
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-gpu")
options.add_argument("--log-level=3")
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
    
    for t in tabs:
        driver.get(f"{URL_AIRCRAFT}{t}")
        print("big" in driver.find_element_by_xpath('//*[@id="aircraft_buyNew_step2"]/div[1]/div[1]/div/img[1]').get_attribute('src'), wait.until(presence_of_element_located((By.XPATH, '//*[@id="aircraft_buyNew_step2"]/div[1]/div[1]/div/img[1]'))))
        if (wait.until(presence_of_element_located((By.XPATH, '//*[@id="aircraft_buyNew_step2"]/div[1]/div[1]/div/img[1]'))) and "big" in driver.find_element_by_xpath('//*[@id="aircraft_buyNew_step2"]/div[1]/div[1]/div/img[1]').get_attribute('src')):
            for elem in driver.find_elements_by_class_name('.aircraftPurchaseBox'):
                print(elem)

    with open(f"./data/{date}.json", "w", encoding='utf8') as f:
        f.write(json.dumps(AllResult))
