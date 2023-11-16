const { Conectar, Request, TYPES, config } = require('./conexion');  

function ListaHabitacionPagina(pagina, respuesta) {
    const connection = new Conectar(config);

    connection.connect();

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        request = new Request('EXEC sp_listaHabitaciones @Pagina, @RegistrosPorPagina', function (err) {
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
            data = {idHabitacion: columns[0].value, habitacion: columns[1].value, tipo: columns[2].value, capacidad: columns[3].value, precio: columns[4].value, estado: columns[5].value};               
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

module.exports.ListaHabitacionPagina = ListaHabitacionPagina;