patternMembers = {"ID": None, "Name": None, "Star": "Hard Work in Here !!! (Soon)",
                  "Owner": None, "Hubs": [], "Role": None}
star = {"Nombre": None, "Type": None}


def Member(driver, result):
    for i in range(2, len(driver.find_elements_by_css_selector('#allianceMembersList > tbody > tr'))):
        patternMembersCopy = patternMembers.copy()
        patternMembersCopy["Name"] = driver.find_element_by_xpath(
            f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[1]').text
        patternMembersCopy["ID"] = int(driver.find_element_by_xpath(
            f'//*[@id="allianceMembersList"]/tbody/tr[{i}]/td[6]/a').get_attribute('href').split("/")[-1])
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
    return result
