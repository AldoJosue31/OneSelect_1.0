const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const comidas = [
      {
          id: 1,
          producto: 'Hamburguesa',
          precio: '30',
          CDP: 'Hamburguesa'
      },
      {
          id: 2,
          producto: 'Torta',
          precio: '30',
          CDP: 'Torta'
      },
      {
          id: 3,
          producto: 'Hot Dog',
          precio: '30',
          CDP: 'HotDog'
  
      },
  ];  
      res.render("index",{
        comidas : comidas,
      }
      
      );
    });
  
  router.get("/registros", (req, res) => {
      res.render("registros",);
  });
  
  router.get("/covid", (req, res) => {
    res.render("covid",);
  });
  
  router.get("/acerca-de", (req, res) => {
    res.render("acerca-de", { version: "1.0.0", desarrollador: "G.A.I.D"});
  });


  module.exports = router;