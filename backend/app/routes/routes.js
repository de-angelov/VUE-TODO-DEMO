const { Router } = require('express');
const fs = require('fs');


const init = (app) => {
  const router = new Router();
  router
  .get('/', async (req, res) => {
    
    fs.readFile('./app/storage/data.json', 'utf8', (err, data) => {
      if (err) { throw err; }
      const obj = JSON.parse(data);
      console.log('send =>',typeof obj);
      console.log('send =>',obj);
      res.json(obj);
    });
  })
  .post('/',async (req, res) => {
    const data = req.body;
    console.log('post =>', data);
    fs.writeFile('./app/storage/data.json', JSON.stringify(data, null, 2) , 'utf-8',(e)=>console.log(e));
    res.sendStatus(200);
  });

  app.use('/', router);
}

module.exports = {
  init,
}