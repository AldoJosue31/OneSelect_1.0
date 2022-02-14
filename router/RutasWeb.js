
const data = require('../public/menu');
var comidas = data.comidas;
const express = require('express');
const router = express.Router(); 


router.get("/", (req, res) => {
    
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

  router.get("/productos", (req, res) => {
    res.render("productos",);
  });
  
  
  router.get("/acerca-de", (req, res) => {
    res.render("acerca-de", { version: "1.0.0", desarrollador: "G.A.I.D"});
  });


  module.exports = router;