def Profile(driver, result):
    result["Name"] = driver.find_element_by_xpath(
        '//*[@id="alliance_profile"]/div[1]/div[2]/ul/li[1]/b').text
    result["ID"] = int(driver.find_element_by_xpath(
        f'//*[@id="alliance_profile"]/div[2]/div[1]/a').get_attribute('href').split("/")[-1])
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
        '//*[@id="alliance_profile_statistiques_general_hubs"]/tbody/tr[2]/td[1]/div/span[2]').text.replace(" ", "").replace("km", "").replace(",", ""))
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
    return result