var express = require('express');
var ServicioConsulta = require("../models/servicioConsultas");

var acceso = express.Router();

acceso.post("/agregarServicio",function(req,res){  
    ServicioConsulta.AgregarServicio(req.body.idSer, res);   
});

acceso.post("/pagarFactura",function(req,res){  
    ServicioConsulta.PagarFactura(req.body, res);   
});

module.exports = acceso;