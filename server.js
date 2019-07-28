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
    // var table = await page.evaluate(() => {
    //   //var temp = document.querySelectorAll('#div_results > table > tbody > tr > td > span');
    //   var tab = document.querySelector("#div_results > table");
    //   for (var i = 0, row; row = tab.rows[i]; i++) {
    //     for (var j = 0, col; col = row.cells[j]; j++) {
    //       console.log(tab[col][row]);
    //     }  
    //  }
    //   return tab;
    // });
    //console.log(table);

    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll('#div_results > table > tbody > tr > td > span'));
      return tds.map(td => td.innerText);
    });

    // for(var i=0; i<data.length; i++){
    //   if(data[i] != ""){
    //     console.log(data[i]);
    //   }
    // }

    const jso = {
      "mo" : [
        {"09:00" : data[8]},
        {"10:00" : data[16]},
        {"11:00" : data[24]},
        {"12:00" : data[32]},
        {"13:00" : data[40]},
        {"14:00" : data[48]},
        {"15:00" : data[56]},
        {"16:00" : data[64]},
        {"17:00" : data[72]},
        {"18:00" : data[80]},
        {"19:00" : data[88]},
        {"20:00" : data[96]},
        {"21:00" : data[104]},
        {"22:00" : data[112]}
      ],
      "tu":[
        {"09:00" : data[9]},
        {"10:00" : data[17]},
        {"11:00" : data[25]},
        {"12:00" : data[33]},
        {"13:00" : data[41]},
        {"14:00" : data[49]},
        {"15:00" : data[57]},
        {"16:00" : data[65]},
        {"17:00" : data[73]},
        {"18:00" : data[81]},
        {"19:00" : data[89]},
        {"20:00" : data[97]},
        {"21:00" : data[105]},
        {"22:00" : data[113]}
      ],
      "we":[
        {"09:00" : data[10]},
        {"10:00" : data[18]},
        {"11:00" : data[26]},
        {"12:00" : data[34]},
        {"13:00" : data[42]},
        {"14:00" : data[50]},
        {"15:00" : data[58]},
        {"16:00" : data[66]},
        {"17:00" : data[74]},
        {"18:00" : data[82]},
        {"19:00" : data[90]},
        {"20:00" : data[98]},
        {"21:00" : data[106]},
        {"22:00" : data[114]}
      ],
      "th":[
        {"09:00" : data[11]},
        {"10:00" : data[19]},
        {"11:00" : data[27]},
        {"12:00" : data[35]},
        {"13:00" : data[43]},
        {"14:00" : data[51]},
        {"15:00" : data[59]},
        {"16:00" : data[67]},
        {"17:00" : data[75]},
        {"18:00" : data[83]},
        {"19:00" : data[91]},
        {"20:00" : data[99]},
        {"21:00" : data[107]},
        {"22:00" : data[115]}
      ],
      "fr":[
        {"09:00" : data[12]},
        {"10:00" : data[20]},
        {"11:00" : data[28]},
        {"12:00" : data[36]},
        {"13:00" : data[44]},
        {"14:00" : data[52]},
        {"15:00" : data[60]},
        {"16:00" : data[68]},
        {"17:00" : data[76]},
        {"18:00" : data[84]},
        {"19:00" : data[92]},
        {"20:00" : data[100]},
        {"21:00" : data[108]},
        {"22:00" : data[116]}
      ]
    }


    //await page.screenshot({path: 'clickbd.png', fullPage: true});

    await browser.close();
    res.json(jso);
  })();
});

app.listen(3000, function () {
  console.log('server listening on port 3000!');
});
