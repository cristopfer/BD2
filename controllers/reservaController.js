var express = require('express');
var ReservaConsulta = require("../models/reservaConsultas");

var acceso = express.Router();

acceso.post("/ingresarReserva",function(req,res){     
    ReservaConsulta.IngresarReserva(req.body, res);   
});

acceso.post("/consultarReservas",function(req,res){  
    ReservaConsulta.ConsultarReservas(req.body.pagina, res);   
});

acceso.post("/obtenerDatos",function(req,res){  
    global.idres = req.body.idReserva;   
    global.preRes = req.body.precio;
    res.send(JSON.stringify({ estado: 0 }));
});

acceso.post("/datosReservas",function(req,res){  
    ReservaConsulta.PagarReservas(res);   
});

module.exports = acceso;