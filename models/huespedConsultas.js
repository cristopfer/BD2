const { Conectar, Request, TYPES, config } = require('./conexion');  

function IngresarHuesped(datos, respuesta) {
    const connection = new Conectar(config);
    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_ingresarHuespedes @nom,@apeP,@apeM,@dni,@cel,@nac,@cor', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('nom', TYPES.VarChar, datos.nombre);
        request.addParameter('apeP', TYPES.VarChar, datos.apePaterno);
        request.addParameter('apeM', TYPES.VarChar, datos.apeMaterno);
        request.addParameter('dni', TYPES.VarChar, datos.dni);
        request.addParameter('cel', TYPES.VarChar, datos.celular);
        request.addParameter('nac', TYPES.VarChar, datos.nacionalidad);
        request.addParameter('cor', TYPES.VarChar, datos.correo);
        request.on('row', (columns) => { 
            respuesta.send(JSON.stringify({ estado: columns[0].value }));   
        });
        connection.execSql(request);
    });
}

function MostrarHuesped(idH, respuesta) {
    const connection = new Conectar(config);

    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_mostrarHuesped @idH', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('idH', TYPES.VarChar, idH);
        var rows = [];        
        request.on('row', (columns) => {     
            data = {idHuesped: columns[0].value, nombre: columns[1].value, apePat: columns[2].value, apeMat: columns[3].value};               
            rows.push(data);
        });

        request.on('doneInProc', (rowCount, more) => {
            if(rows.length != 0){
                respuesta.send(rows);
            }
            rows = [];
        });
        connection.execSql(request);
    });
}

function MonitorearHuesped(pagina, respuesta) {
    const connection = new Conectar(config);

    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_listaMonitoreoReservaHuesped @Pagina, @RegistrosPorPagina', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('Pagina', TYPES.VarChar, pagina);
        request.addParameter('RegistrosPorPagina', TYPES.Int, 4);
        var rows = [];        
        request.on('row', (columns) => {
            if (columns[0].value != null){
                time1 = columns[0].value.toISOString().split(/[T:.Z]/);  
                horas1 = time1[1]+":"+time1[2]+":"+time1[3];
            }
            else
                horas1 = "";            
            if (columns[1].value != null){  
                time2 = columns[1].value.toISOString().split(/[T:.Z]/); 
                horas2 = time2[1]+":"+time2[2]+":"+time2[3];
            }
            else
                horas2 = "";              
            data = {checkIn: horas1, checkOut: horas2, idResHue: columns[2].value, nombre: columns[3].value, apePat: columns[4].value, apeMat: columns[5].value, habitacion: columns[6].value};               
            rows.push(data);
        });

        request.on('doneInProc', (rowCount, more) => {
            if(rows.length != 0){
                respuesta.send(rows);
            }
            rows = [];
        });
        connection.execSql(request);
    });
}

function MarcarLlegada(id, respuesta) {
    const connection = new Conectar(config);
    connection.connect();
    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_marcarLlegada @idRH', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('idRH', TYPES.Int, id);
        request.on('row', (columns) => { 
            respuesta.send(JSON.stringify({ estado: columns[0].value }));   
        });
        connection.execSql(request);
    });
}

function MarcarSalida(id, respuesta) {
    const connection = new Conectar(config);
    connection.connect();
    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_marcarSalida @idRH', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('idRH', TYPES.Int, id);
        request.on('row', (columns) => { 
            respuesta.send(JSON.stringify({ estado: columns[0].value }));   
        });
        connection.execSql(request);
    });
}

function ReservasHuesped(respuesta) {
    const connection = new Conectar(config);

    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_mostrarHuespedesReservas @idR', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('idR', TYPES.Int, parseInt(global.idres));
        var rows = [];        
        request.on('row', (columns) => { 
            global.idhue = columns[3].value;    
            data = {nombre: columns[0].value, apePat: columns[1].value, apeMat: columns[2].value};               
            rows.push(data);
        });

        request.on('doneInProc', (rowCount, more) => {
            if(rows.length != 0){
                respuesta.send(rows);
            }
            rows = [];
        });
        connection.execSql(request);
    });
}

module.exports.IngresarHuesped = IngresarHuesped;
module.exports.MostrarHuesped = MostrarHuesped;
module.exports.MonitorearHuesped = MonitorearHuesped;
module.exports.MarcarLlegada = MarcarLlegada;
module.exports.MarcarSalida = MarcarSalida;
module.exports.ReservasHuesped = ReservasHuesped;