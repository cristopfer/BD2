const { Conectar, Request, TYPES, config } = require('./conexion'); 

function IngresarReserva(datos, respuesta) {
    const connection = new Conectar(config);
    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_ingresarReserva @fecLleg,@fecSal,@cant,@idH,@idE,@est,@idArray', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('fecLleg', TYPES.VarChar, datos.fecLlegada);
        request.addParameter('fecSal', TYPES.VarChar, datos.fecSalida);
        request.addParameter('cant', TYPES.Int, datos.cantidad);
        request.addParameter('idH', TYPES.Int, parseInt(global.idhab));
        request.addParameter('idE', TYPES.Int, parseInt(global.idemp));
        request.addParameter('est', TYPES.Int, datos.estado);
        request.addParameter('idArray', TYPES.VarChar, datos.ids);
        request.on('row', (columns) => { 
            respuesta.send(JSON.stringify({ estado: 1 }));   
        });
        connection.execSql(request);
    });
}

function ConsultarReservas(pagina, respuesta) {
    const connection = new Conectar(config);

    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_consultarReservas @Pagina, @RegistrosPorPagina', function (err) {
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
            data = {idRes: columns[0].value, habitacion: columns[1].value, precio: columns[2].value};               
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

function PagarReservas(respuesta) {
    const connection = new Conectar(config);

    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_pagarInformacionReserva @idR', function (err) {
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
            data = {habitacion: columns[0].value, precio: columns[1].value, dias: columns[2].value, total: columns[3].value};               
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

module.exports.IngresarReserva = IngresarReserva;
module.exports.ConsultarReservas = ConsultarReservas;
module.exports.PagarReservas = PagarReservas;