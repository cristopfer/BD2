var express = require('express');
var HabitacionConsulta = require("../models/habitacionConsultas");

var acceso = express.Router();

acceso.post("/listaHabitacionPagina",function(req,res){  
    HabitacionConsulta.ListaHabitacionPagina(req.body.pagina, res);   
});

acceso.post("/obtenerIdHabitacion",function(req,res){  
    global.idhab = req.body.idHabitacion;   
    res.send(JSON.stringify({ estado: 0 }));
});

module.exports = acceso;