var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/schedule', function (req, res) {
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
    await page.goto('https://my.sdu.edu.kz/index.php?mod=schedule', {waitUntil: 'networkidle2', headless: false});
    
    await page.select('#ysem', '2018#2');
    await page.click('#divModule > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > input[type=button]');
    await page.waitForSelector('#div_results > table > tbody > tr:nth-child(1) > td:nth-child(2)');

    //var table = '#div_results > table > tbody';
    var table = await page.evaluate(() => document.querySelectorAll('#div_results > table > tbody > tr').outerHTML);
    var
    await page.screenshot({path: 'clickbd.png', fullPage: true});

    await browser.close();
    res.send(table);
  })();
});

app.listen(3000, function () {
  console.log('server listening on port 3000!');
});
