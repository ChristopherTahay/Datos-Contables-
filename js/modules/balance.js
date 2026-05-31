// ════════════════════════════════════════
// BALANCE DE COMPROBACIÓN
// ════════════════════════════════════════

function calcularBalance() {

    const mayor = calcularMayor();

    const filas = [];

    Object.keys(mayor).forEach(id => {

        const cuenta = CATALOGO[id];

        const movs = mayor[id];

        const neto =
            movs.totalDebe -
            movs.totalHaber;

        let saldoDebe = 0;

        let saldoHaber = 0;

        if (neto > 0) {

            saldoDebe = neto;

        } else if (neto < 0) {

            saldoHaber = Math.abs(neto);

        }

        filas.push({

            id,

            nombre: cuenta.nombre,

            tipo: cuenta.tipo,

            natural: cuenta.natural,

            totalDebe: movs.totalDebe,

            totalHaber: movs.totalHaber,

            saldoDebe,

            saldoHaber

        });

    });

    filas.sort(
        (a, b) => parseInt(a.id) - parseInt(b.id)
    );

    return filas;

}