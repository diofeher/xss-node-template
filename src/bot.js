const puppeteer = require('puppeteer');

const FLAG = process.env.FLAG;

const runBot = async (url) => {
  const browser = await puppeteer.launch(
    args=['--no-sandbox', '--disable-gpu']
  );
  page = await browser.newPage();

  await page.evaluateOnNewDocument((flag) => {
    document.cookie = `flag=${flag}`;
  }, FLAG);

  await page.goto(url);
  setTimeout(() => {
    browser.close();
  }, 3000);
}

exports.runBot = runBot;
