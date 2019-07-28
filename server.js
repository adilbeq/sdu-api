var express = require('express');
var app = express();

app.post('/grades', function (req, res) {
  const puppeteer = require('puppeteer');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://my.sdu.edu.kz/index.php', {waitUntil: 'networkidle2', headless: false});
    await page.pdf({path: 'hn.pdf', format: 'A4'});

    await browser.close();
  })();

});

app.listen(3000, function () {
  console.log('server listening on port 3000!');
});
