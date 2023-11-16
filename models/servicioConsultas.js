const { Conectar, Request, TYPES, config } = require('./conexion'); 

function AgregarServicio(id, respuesta) {
    const connection = new Conectar(config);

    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_agregarServicio @idS', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('idS', TYPES.Int, parseInt(id));
        var rows = [];        
        request.on('row', (columns) => {
            data = {nombre: columns[0].value, categoria: columns[1].value, costo: columns[2].value};               
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

function PagarFactura(datos, respuesta) {
    const connection = new Conectar(config);
    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_pagarFacturaHotel @idEmp,@idHue,@idRes,@fecEmi,@tip,@total,@idArray', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('idEmp', TYPES.Int, parseInt(global.idemp));
        request.addParameter('idHue', TYPES.Int, parseInt(global.idhue));
        request.addParameter('idRes', TYPES.Int, parseInt(global.idres));
        request.addParameter('fecEmi', TYPES.VarChar, datos.fecEmi);
        request.addParameter('tip', TYPES.VarChar, datos.tipo);
        request.addParameter('total', TYPES.Float, parseFloat(datos.total));
        request.addParameter('idArray', TYPES.VarChar, datos.ids);
        request.on('row', (columns) => { 
            respuesta.send(JSON.stringify({ estado: 1 }));   
        });
        connection.execSql(request);
    });
}

module.exports.AgregarServicio = AgregarServicio;
module.exports.PagarFactura = PagarFactura;