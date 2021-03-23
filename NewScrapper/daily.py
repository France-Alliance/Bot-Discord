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
from selenium.common import exceptions
from selenium.webdriver.support import expected_conditions as EC

options = Options()
# options.add_argument("--headless")
options.add_argument("--no-sandbox")
options.add_argument("--disable-gpu")
options.add_argument("--log-level=3")

os.chdir(os.path.dirname(os.path.abspath(__file__)))
a = os.path.abspath('../.env')
SYSTEM_ENV = dotenv.dotenv_values(a)
#print(SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"], SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"])


# class "purchaseButton validateWinPopup"

URL = 'https://www.airlines-manager.com/'
# 2 Arguments (Tabs of Alliance (profile|members|network)/ ID Alliance)
URL_WHEEL_GAME = 'https://www.airlines-manager.com/home/wheeltcgame'
# 2ARguments (Tabs of Members (airline | network) / ID Members)
URL_MEMBERS_PROFIL = 'https://www.airlines-manager.com/company/profile'


email = SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"]
password = SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"]

path = "chromedriver"

if platform.node() == "OSchell-Laptop":
    path = SYSTEM_ENV["CHROMEDRIVER_PATH"]

# if platform.system() != "Windows":
#    path = os.path.abspath("chromedriver-v9.4.4-linux-x64/chromedriver")

with webdriver.Chrome(executable_path=path, options=options) as driver:
    def connect():
        driver.find_element_by_id('username').send_keys(email)
        print("username good")
        driver.find_element_by_id('password').send_keys(password)
        print("password good")
        a = "#loginSubmit"
        b = driver.find_element(By.CSS_SELECTOR, a)
        print("login button: "+b.text)
        try:
            webdriver.ActionChains(driver).move_to_element(b).click(b).perform()
            #b.click()
            print("click good")
        except:
            print("error")

    print("go to URL")
    driver.get(URL)
    print("gone to URL")
    print("will wait")
    wait = WebDriverWait(driver, 10)
    print("has waited")
    print("will connect")
    connect()
    print("passed connect")
    driver.get(URL_WHEEL_GAME)
    wait.until(presence_of_element_located((By.CLASS_NAME, 'validBtnBlue')))
    # driver.find_elements_by_class_name('validBtnBlue').click()
