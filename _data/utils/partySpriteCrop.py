import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()
path = "C:\\Users\\Alexa\\Documents\\GitHub\\pokemon-battler\\public\\images\\pokemon\\sprites\\party"

sprites = os.listdir(path)

for file_name in sprites:

    driver.get("https://www.imageonlinetools.com/trim-transparent-pixels")

    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, "inputImage")))

    input_image = driver.find_element(By.ID, "inputImage")
    input_image.send_keys(f"{path}\\{file_name}")

    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, '//button[text()="Trim image"]')))

    driver.find_element(By.XPATH, '//button[text()="Trim image"]').click()

    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, '/html/body/div/div/div[4]/div[3]/div/button')))

    driver.find_element(By.XPATH, '/html/body/div/div/div[4]/div[3]/div/button').click()

driver.close()
