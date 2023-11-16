var express = require('express');
var HuespedConsulta = require("../models/huespedConsultas");

var acceso = express.Router();

acceso.post("/mostrarHuesped",function(req,res){  
    HuespedConsulta.MostrarHuesped(req.body.idH, res);   
});

acceso.post("/ingresarHuesped",function(req,res){     
    HuespedConsulta.IngresarHuesped(req.body, res);   
});

acceso.post("/monitorearHuesped",function(req,res){  
    HuespedConsulta.MonitorearHuesped(req.body.pagina, res);   
});

acceso.post("/llegada",function(req,res){  
    HuespedConsulta.MarcarLlegada(req.body.id, res);   
});

acceso.post("/salida",function(req,res){  
    HuespedConsulta.MarcarSalida(req.body.id, res);   
});

acceso.post("/reservaHuespedes",function(req,res){  
    HuespedConsulta.ReservasHuesped(res);   
});

module.exports = acceso;