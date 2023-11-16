const { Conectar, Request, TYPES, config } = require('./conexion');  

function IngresarSistemaEmpleado(correo, respuesta) {
    const connection = new Conectar(config);

    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_ingresarSistema @cor', function (err) {
            if (err) {
                console.error(err);
                connection.close();
            }
            else {
                connection.close();
            }
        });
        request.addParameter('cor', TYPES.VarChar, correo);
        request.on('row', (columns) => { 
            global.idemp =  columns[0].value;
            respuesta.send(JSON.stringify({ estado: columns[0].value }));   
        });
        connection.execSql(request);
    });
}

module.exports.IngresarSistemaEmpleado = IngresarSistemaEmpleado;