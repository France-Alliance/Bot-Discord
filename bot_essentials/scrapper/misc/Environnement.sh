#!/bin/bash
sudo apt install python3-pip chromium-browser unzip
sudo wget "https://github.com/electron/electron/releases/download/v9.4.4/chromedriver-v9.4.4-linux-x64.zip"
sudo unzip chromedriver-v9.4.4-linux-x64.zip -d chromedriver-v9.4.4-linux-x64
export PATH=$PATH:`pwd`/chromedriver-v9.4.4-linux-x64/
export PATH=$PATH:`pwd`/chromedriver-v9.4.4-linux-x64/chromedriver
sudo pip3 install python-dotenv beautifulsoup4 selenium