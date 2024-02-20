import os
from getpass import getpass
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()

PATH = "C:\\Users\\Alexa\\Documents\\GitHub\\pokemon-battler\\public\\images\\pokemon\\sprites\\party"
EMAIL_ID = ""

sprites = os.listdir(PATH)

driver.get("https://pixlr.com")

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'head-login')]"))
)
driver.find_element(By.XPATH, "//*[contains(@id,'head-login')]").click()

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'choose-email')]"))
)
driver.find_element(By.XPATH, "//*[contains(@id,'choose-email')]").click()

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'entry-email')]"))
)
driver.find_element(By.XPATH, "//*[contains(@id,'entry-email')]").send_keys(EMAIL_ID)
driver.find_element(By.XPATH, "//*[contains(@id,'entry-password')]").send_keys(
    getpass()
)
driver.find_element(By.XPATH, "//*[contains(@id,'entry-submit')]").click()

driver.get("https://pixlr.com/editor/")

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'announce-close')]"))
)
driver.find_element(By.XPATH, "//*[contains(@id,'announce-close')]").click()

for file_name in sprites:
    sprite_url = (
        f"https://pokemon.alexakruckenberg.com/images/pokemon/sprites/party/{file_name}"
    )

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located(
            (By.XPATH, "//*[contains(@id,'splash-file-menu')]")
        )
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'splash-file-menu')]").click()

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located(
            (By.XPATH, "//*[contains(@id,'splash-file-url')]")
        )
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'splash-file-url')]").click()

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'image-url')]"))
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'image-url')]").send_keys(
        sprite_url
    )

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'dialog-apply')]"))
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'dialog-apply')]").click()

    WebDriverWait(driver, 5).until(
        EC.invisibility_of_element((By.XPATH, "//*[contains(@id,'modal')]"))
    )

    # image menu item
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//label[contains(text(), 'Image')]"))
    )
    driver.find_element(By.XPATH, "//label[contains(text(), 'Image')]").click()

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located(
            (By.XPATH, "//*[contains(@id,'image-canvas-resize')]")
        )
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'image-canvas-resize')]").click()

    # resize canvas dialog
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located(
            (By.XPATH, "//*[contains(@id,'canvas-size-width')]")
        )
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'canvas-size-width')]").clear()
    driver.find_element(By.XPATH, "//*[contains(@id,'canvas-size-width')]").send_keys(
        "112"
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'canvas-size-height')]").clear()
    driver.find_element(By.XPATH, "//*[contains(@id,'canvas-size-height')]").send_keys(
        "112"
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'dialog-apply')]").click()

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'shortcut-save')]"))
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'shortcut-save')]").click()

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'dialog-apply')]"))
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'dialog-apply')]").click()

    # file menu item
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//label[contains(text(), 'File')]"))
    )
    driver.find_element(By.XPATH, "//label[contains(text(), 'File')]").click()

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, "//*[contains(@id,'file-close')]"))
    )
    driver.find_element(By.XPATH, "//*[contains(@id,'file-close')]").click()

driver.close()
