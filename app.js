var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var path = require("path"); 
var engines = require('consolidate');
var mustache = require('mustache');

var router_habitacion = require('./controllers/habitacionController');
var router_empleado = require('./controllers/empleadoController');
var router_huesped = require('./controllers/huespedController');
var router_reserva = require('./controllers/reservaController');
var router_servicio = require('./controllers/servicioController');

global.idemp = '-';
global.idhab = '-';
global.idres = '-';
global.idhue = '-';
global.preRes = '-';

var app = express();
var port = process.env.PORT || 8080;
var host = process.env.IP || '0.0.0.0';
var srcpath = path.join(__dirname,'/views');

app.use(express.static(__dirname+'/views'));
app.use(session({secret:'XASDASDA', resave: true, saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', engines.mustache);
app.set("view engine", "html");

app.get("/",function(req,res){ 	
    res.render(srcpath + '/Login.html');
});

app.use("/habitacionController",router_habitacion);
app.use("/empleadoController",router_empleado);
app.use("/huespedController",router_huesped);
app.use("/reservaController",router_reserva);
app.use("/servicioController",router_servicio);

app.listen(port, host ,function(){   
    console.log("server start on port"+ port);  
});