var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/login', function (req, res) {
  const puppeteer = require('puppeteer');
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width:1366, height:1000}); 
    await page.goto('https://my.sdu.edu.kz/index.php', {waitUntil: 'networkidle2', headless: false});
    await page.waitForSelector('#username');
    const username = '#username';
    await page.$eval(username, (el, value) => el.value = value, req.body.username);
    const password = '#password';
    await page.$eval(password, (el, value) => el.value = value, req.body.password);
    
    const submitBtn = "div > form > input";
    await page.click(submitBtn);


    // var clickContinue2 = "body > div > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > div > div:nth-child(7) > a";
    // await page.click(clickContinue2);
    await page.goto('https://my.sdu.edu.kz/index.php?mod=schedule', {waitUntil: 'networkidle2', headless: false});
    
    await page.screenshot({path: 'clickbd.png', fullPage: true});

    await browser.close();
    res.send(200);
  })();
});

app.listen(3000, function () {
  console.log('server listening on port 3000!');
});
