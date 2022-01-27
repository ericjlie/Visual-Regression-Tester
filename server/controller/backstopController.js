const backstop = require('backstopjs');
const settings = require('./backstopSettings.js')

module.exports = {
  reference: async (req, res, next) => {
    console.log(req.body);
    const scenarios = req.body.urls.map(url => {
      return {
        "label": url.label,
            "cookiePath": "backstop_data/engine_scripts/cookies.json",
            "url": url.url,
            "referenceUrl": "",
            "delay": 2000,
            "misMatchThreshold" : 0.1,
            "requireSameDimensions": true
      }

    })
    const referenceData = await backstop('reference', {
      config: {
        "id": req.body.testName,
        "viewports": settings.viewports,
        "scenarios": scenarios,
        "paths": {
          "bitmaps_reference": `client/dist/visreg/${req.body.testName}/bitmaps_reference`,
          "bitmaps_test": `client/dist/visreg/${req.body.testName}/bitmaps_test`,
          "engine_scripts": `client/dist/visreg/${req.body.testName}/engine_scripts`,
          "html_report": `client/dist/visreg/${req.body.testName}/html_report`,
          "ci_report": `client/dist/visreg/${req.body.testName}/ci_report`
        },
        "engine": "puppeteer",
        "engineOptions": {
          "args": ["--no-sandbox"]
        },
        "asyncCaptureLimit": 5,
        "asyncCompareLimit": 50,
        "debug": false,
        "debugWindow": false
      }

    })
    console.log(referenceData);
    res.send(referenceData)
  },
  test: async (req, res, next) => {
    console.log(req.body);
    const time = new Date();
    console.log(time);

    //I'm so sorry - terrible time parsing code below
    let hours;
    if(time.getHours().toString().length === 1){
      hours = '0' + time.getHours().toString();
    } else {
      hours = time.getHours().toString();
    }
    const folderTime = (
      time.getFullYear().toString() +
      '0' + (time.getMonth() + 1).toString() +
      time.getDate().toString() +
      '-' +
      hours +
      + time.getMinutes().toString() +
      time.getSeconds().toString());
    console.log(folderTime);
    //END terrible time code parser
    const tests = await Promise.all(req.body.tests.map(async (test)=>{
      const scenarios = test.urls.map(url => {
        return {
          "label": url.label,
              "cookiePath": "backstop_data/engine_scripts/cookies.json",
              "url": url.url,
              "referenceUrl": "",
              "delay": 400,
              "misMatchThreshold" : 0.1,
              "requireSameDimensions": true
        }
      })
      try {
        const testData = await backstop('test', {
        config: {
          "id": test.testName,
          "viewports": settings.viewports,
          "scenarios": scenarios,
          "paths": {
            "bitmaps_reference": `client/dist/visreg/${test.testName}/bitmaps_reference`,
            "bitmaps_test": `client/dist/visreg/${test.testName}/bitmaps_test`,
            "engine_scripts": `client/dist/visreg/${test.testName}/engine_scripts`,
            "html_report": `client/dist/visreg/${test.testName}/html_report`,
            "ci_report": `client/dist/visreg/${test.testName}/ci_report`
          },
          "engine": "puppeteer",
          "engineOptions": {
            "args": ["--no-sandbox"]
          },
          "asyncCaptureLimit": 2,
          "asyncCompareLimit": 50,
          "debug": false,
          "debugWindow": false
        }
        })

      } catch (e) {
        res.status(500);
      }
    }))

    res.status(201).send(folderTime);

  },
}