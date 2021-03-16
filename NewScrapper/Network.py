patternHubs = {"IATA": None, "DemandPartage": None, "NbLigne": None,
               "KmLigne": None, "NbKmAutoriser": None, "KmRestant": None, "Benefices": None}


def Network(driver, result):
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
    return result
