const puppeteer = require('puppeteer');
const fs = require('fs');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/davilastore_/');
  const imageList = await page.evaluate(() => {
    //Pegando imagens do Post
        const nodeList = document.querySelectorAll('article img');

    //Transformando nodeList em Array
        const imageArray = [...nodeList];

    //Transformando os nodes (elementos html) em objetos JS
        const imageList = imageArray.map( ({src}) => ({src}))

    //Colocando para fora da função
        return imageList;
  })
 
  //Escrevendo os dados em um arquivo local (JSON)
  fs.writeFile('instagram.json', JSON.stringify(imageList, null, 2), err => {
      if(err) throw new Error('something went wrong')
 
      console.log('well done')
  })

  await browser.close();
})();