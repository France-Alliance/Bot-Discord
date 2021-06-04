#!/bin/bash

cd /home/pi/git/Bot-Discord
nodemon --ignore "../../NewScrapper/data" --inspect=9231 index.js
