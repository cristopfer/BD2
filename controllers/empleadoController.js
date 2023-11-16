var express = require('express');
var EmpleadoConsulta = require("../models/empleadoConsultas");

var acceso = express.Router();

acceso.post("/ingresarSistema",function(req,res){  
    EmpleadoConsulta.IngresarSistemaEmpleado(req.body.correo, res);   
});

module.exports = acceso;