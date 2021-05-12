from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import presence_of_element_located
from selenium.webdriver.common.by import By

patternMembers = {"ID": None, "Name": None, "Star": None,
                  "Owner": None, "Hubs": [], "Role": None, "Valorisation": None, "Solde": None, "LastConnection": "Hard Work in Here !!! (Soon)"}
star = {"Nombre": None, "Type": None}


def Member(driver, result):
    wait = WebDriverWait(driver, 10)
    
    for i in range(2, len(driver.find_elements_by_css_selector('#allianceMembersList > tbody > tr'))):
        patternMembersCopy = patternMembers.copy()
        patternMembersCopy["Name"] = driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[1]').text.replace(" ", "_")
        patternMembersCopy["ID"] = int(driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[6]/a').get_attribute('href').split("/")[-1])
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
        patternMembersCopy["Owner"] = driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[3]').text.replace(" ", "_")
        patternMembersCopy["Hubs"] = driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[4]').text.replace(" ", "").replace("\n", "").split("/")
        if driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[5]/ul').text != "":
            patternMembersCopy["Role"] = driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[5]/ul/li').text
        else:
            patternMembersCopy["Role"] = driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[5]/ul').text
        
        #driver.find_element_by_xpath(f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[6]/a').click()
        driver.execute_script('document.querySelector("#allianceMembersList > tbody > tr:nth-child(2) > td:nth-child(6) > a").click();')
        if (wait.until(presence_of_element_located((By.XPATH, '//*[@id="company_profile"]/div[2]/div[3]/div[1]/div[2]/span[2]')))):
            patternMembersCopy["Valorisation"] = int(driver.find_element_by_xpath(f'//*[@id="company_profile"]/div[2]/div[3]/div[1]/div[2]/span[2]').text.replace(" ", "").replace("$", "").replace(",", ""))
            patternMembersCopy["Solde"] = int(driver.find_element_by_xpath(f'//*[@id="company_profile"]/div[2]/div[3]/div[2]/div[2]/span[2]').text.replace(" ", "").replace("$", "").replace(",", ""))
            patternMembersCopy["LastConnection"] = driver.find_element_by_xpath(f'//*[@id="company_profile"]/div[2]/div[3]/div[2]/div[1]/span[2]').text
        
        driver.back()
        if (wait.until(presence_of_element_located((By.CSS_SELECTOR, '#allianceMembersList > tbody > tr:nth-child(1) > th:nth-child(2) > span')))):
            del patternMembersCopy["Hubs"][len(patternMembersCopy["Hubs"])-1]
            result["Members"].append(patternMembersCopy)
    return result
