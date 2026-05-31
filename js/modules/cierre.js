// ════════════════════════════════════════
// CIERRE CONTABLE
// ════════════════════════════════════════

function generarCierreContable() {

    // Obtener resultados
    const resultados =
        calcularResultados();

    // Validar movimientos
    if (!resultados.cuentas.length) {

        toast(
            "No existen cuentas para cerrar",
            false
        );

        return;

    }

    // Verificar si ya existe cierre
    const existeCierre = PARTIDAS.some(

        partida =>

            partida.descripcion ===
            "CIERRE CONTABLE"

    );

    if (existeCierre) {

        toast(
            "El cierre contable ya fue generado",
            false
        );

        return;

    }

    // Movimientos de cierre
    const movimientos = [];

    // ═════════ CERRAR CUENTAS ═════════

    resultados.cuentas.forEach(cuenta => {

        // INGRESOS
        if (cuenta.tipo === "Ingreso") {

            movimientos.push({

                cuentaId: cuenta.codigo,

                debe: cuenta.saldo,

                haber: 0

            });

        }

        // GASTOS
        if (cuenta.tipo === "Gasto") {

            movimientos.push({

                cuentaId: cuenta.codigo,

                debe: 0,

                haber: cuenta.saldo

            });

        }

    });

    // ═════════ UTILIDAD / PÉRDIDA ═════════

    const utilidad =
        resultados.utilidad;

    // UTILIDAD
    if (utilidad > 0) {

        movimientos.push({

            cuentaId: "391",

            debe: 0,

            haber: utilidad

        });

    }

    // PÉRDIDA
    else if (utilidad < 0) {

        movimientos.push({

            cuentaId: "391",

            debe: Math.abs(utilidad),

            haber: 0

        });

    }

    // ═════════ CREAR PARTIDA ═════════

    PARTIDAS.push({

        id: siguienteNumPartida(),

        fecha: hoy(),

        descripcion: "CIERRE CONTABLE",

        movimientos

    });

    // ═════════ GUARDAR ═════════

    guardarStorage();

    // ═════════ ACTUALIZAR TODO ═════════

    if (typeof renderDiario === "function") {
        renderDiario();
    }

    if (typeof renderMayor === "function") {
        renderMayor();
    }

    if (typeof renderBalance === "function") {
        renderBalance();
    }

    if (typeof renderResultados === "function") {
        renderResultados();
    }

    if (typeof renderGeneral === "function") {
        renderGeneral();
    }

    toast(
        "Cierre contable generado correctamente"
    );

}