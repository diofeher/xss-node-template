const puppeteer = require('puppeteer');

const runBot = async (url) => {
  const browser = await puppeteer.launch(
    headless=false,
    args=['--no-sandbox', '--disable-gpu']
  );
  page = await browser.newPage();
  console.log('testing flag:', process.env.FLAG);
  await page.evaluateOnNewDocument(() => {
    document.cookie = `flag=${process.env.FLAG}`;
  });

  console.log('aqui?');

  await page.goto(url);
  setTimeout(() => {
    browser.close();
    console.log('fechou?');
  }, 5000);
}

exports.runBot = runBot;
