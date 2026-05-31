// ════════════════════════════════════════
// LIBRO MAYOR
// ════════════════════════════════════════

// Calcular libro mayor
function calcularMayor() {

    const mayor = {};

    PARTIDAS.forEach(partida => {

        partida.movimientos.forEach(mov => {

            if (!CATALOGO[mov.cuentaId]) return;

            // Crear cuenta si no existe
            if (!mayor[mov.cuentaId]) {

                mayor[mov.cuentaId] = {

                    totalDebe: 0,

                    totalHaber: 0,

                    movs: []

                };

            }

            // Acumular
            mayor[mov.cuentaId].totalDebe +=
                Number(mov.debe) || 0;

            mayor[mov.cuentaId].totalHaber +=
                Number(mov.haber) || 0;

            // Guardar movimiento
            mayor[mov.cuentaId].movs.push({

                fecha: partida.fecha,

                partidaId: partida.id,

                descripcion: partida.descripcion,

                debe: Number(mov.debe) || 0,

                haber: Number(mov.haber) || 0

            });

        });

    });

    return mayor;

}