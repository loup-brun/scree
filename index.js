#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer');
let filesCurrentDir = [];
let options = {
  url: 'http://localhost',
  file: 'screenshot.png',
  styleTagUrl: '',
  viewport: {
    width: 600,
    height: 315
  },
};

(async () => {
  fs.readdir(process.cwd(), function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    filesCurrentDir = files
    console.log('showing all files in current dir', files)
    let configFilePos = filesCurrentDir.indexOf('.screenshotrc')
    if (configFilePos !== -1) {
      console.log('We have a config file', filesCurrentDir[configFilePos]);
      fs.readFile(path.join(process.cwd(), filesCurrentDir[configFilePos]), 'utf8', (err, file) => {
        if (err) {
          console.error(err)
          return
        }
        userOptions = JSON.parse(file);
        options = Object.assign({}, options, userOptions)
        console.log('options', options)
      })
    }
  })
  const args = process.argv;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Viewport size
  // OpenGraph is 600x315
  page.setViewport({
    width: options.viewport.width,
    height: options.viewport.height
  });
  // 1st CLI argument takes precedence over config file URL to shoot
  await page.goto( process.argv[2] || options.url );
  // 2nd argument: custom style tag
  await page.addStyleTag({ url: options.styleTagUrl })
  // 2nd optional argument: file path to save
  await page.screenshot({ path: options.file });

  await browser.close();
})();