from datetime import datetime
import json
import dotenv
import platform
import os
import time
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common import exceptions
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select

options = Options()
# options.add_argument("--headless")
# options.add_argument("--no-sandbox")
# options.add_argument("--disable-gpu")
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
URL_CARDHOLDER = 'https://www.airlines-manager.com/shop/cardholder'


email = SYSTEM_ENV["PY_EMAIL_ACCOUNT_1"]
password = SYSTEM_ENV["PY_PASSWORD_ACCOUNT_1"]

path = "chromedriver"

if platform.node() == "OSchell-Laptop":
    path = SYSTEM_ENV["CHROMEDRIVER_PATH"]

# if platform.system() != "Windows":
#    path = os.path.abspath("chromedriver-v9.4.4-linux-x64/chromedriver")

with webdriver.Chrome(executable_path=path, options=options) as driver:

    wait = WebDriverWait(driver, 20)

    def connect():
        driver.find_element_by_id('username').send_keys(email)
        driver.find_element_by_id('password').send_keys(password)
        driver.find_element(By.CSS_SELECTOR, "#loginSubmit").click()

    def wg():
        wait.until(presence_of_element_located((By.CSS_SELECTOR, 'input#play.validBtnBlue')))
        driver.find_element_by_css_selector('input#play.validBtnBlue').click()
        wait.until(presence_of_element_located((By.CLASS_NAME, 'purchaseButton.validateWinPopup')))
        driver.find_element_by_class_name('purchaseButton.validateWinPopup').click()
    
    def ch():
        wait.until(presence_of_element_located((By.XPATH, '//*[@id="currentTC"]/div[1]/div[3]/button')))
        print("Execute JS : ", driver.execute_script('document.querySelector("#currentTC > div:nth-child(1) > div.cardholder-buttoncontainer > button").click();'))
        wait.until(presence_of_element_located((By.XPATH, '//*[@id="popAjaxButton"]')))
        print("Execute JS : ", driver.execute_script('document.querySelector("#popAjaxButton").click();'))
        wait.until(presence_of_element_located((By.XPATH, '//*[@id="form_purchase"]')))
        print("Execute JS : ", driver.execute_script('document.querySelector("#form_purchase").click();'))

   


    driver.get(URL)
    connect()

    driver.get(URL_WHEEL_GAME)
    playable = driver.find_element_by_class_name("wheelTCGameFooter")
    try:
        if playable.get_attribute('data-isallowtoplay') == "true":
            wg()
            print("wheel game was played" )
        else:
            print("wheel game was already played" )
    except Exception as e: 
        print("couldn't play wheel game:" )
        print(e)        

    print("\r")
    driver.get(URL_CARDHOLDER)
    try:
        wait.until(presence_of_element_located((By.XPATH, '//*[@id="currentTC"]/div[1]')))
        ch()
        print("cardholder was open" )
    except Exception as e: 
        print("couldn't open cardholder:" )
        print(e)
        
        
        

    

    
