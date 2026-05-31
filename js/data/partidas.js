// ════════════════════════════════════════
// PARTIDAS CONTABLES
// ════════════════════════════════════════

// Todas las partidas del sistema
let PARTIDAS = [];

// Movimientos actuales del formulario
let movsActuales = [];

// Obtener siguiente número de partida
function siguienteNumPartida() {

    if (!PARTIDAS.length) return 1;

    return Math.max(
        ...PARTIDAS.map(p => p.id)
    ) + 1;

}

// Generar ID de cuenta
function siguienteIdCuenta(tipo) {

    const base = {
        Activo: 100,
        Pasivo: 200,
        Capital: 300,
        Ingreso: 400,
        Gasto: 500
    }[tipo];

    let max = base;

    Object.keys(CATALOGO).forEach(id => {

        const num = parseInt(id);

        if (
            num > base &&
            num < base + 100 &&
            num > max
        ) {
            max = num;
        }

    });

    return max + 1;

}