// ════════════════════════════════════════
// ESTADO DE RESULTADOS
// ════════════════════════════════════════

function calcularResultados() {

    const cuentas = [];

    let totalIngresos = 0;
    let totalGastos = 0;

    // Recorrer catálogo
    Object.entries(CATALOGO).forEach(

        ([codigo, cuenta]) => {

            // Solo ingresos y gastos
            if (

                cuenta.tipo !== "Ingreso" &&
                cuenta.tipo !== "Gasto"

            ) {
                return;
            }

            let debe = 0;
            let haber = 0;

            // Recorrer partidas
            PARTIDAS.forEach(partida => {

                if (!partida.movimientos) return;

                partida.movimientos.forEach(mov => {

                    // 🔥 CORRECTO
                    if (

                        String(mov.cuentaId) ===
                        String(codigo)

                    ) {

                        debe += Number(
                            mov.debe || 0
                        );

                        haber += Number(
                            mov.haber || 0
                        );

                    }

                });

            });

            // Calcular saldo
            let saldo = 0;

            if (cuenta.natural === "Debe") {

                saldo = debe - haber;

            } else {

                saldo = haber - debe;

            }

            // Ignorar vacíos
            if (saldo === 0) return;

            // Guardar
            cuentas.push({

                codigo,
                nombre: cuenta.nombre,
                tipo: cuenta.tipo,
                saldo

            });

            // Totales
            if (cuenta.tipo === "Ingreso") {

                totalIngresos += saldo;

            }

            if (cuenta.tipo === "Gasto") {

                totalGastos += saldo;

            }

        }

    );

    // Utilidad/Pérdida
    const utilidad =

        totalIngresos -
        totalGastos;

    return {

        cuentas,
        ingresos: totalIngresos,
        gastos: totalGastos,
        utilidad

    };

}