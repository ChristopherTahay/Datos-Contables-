// ════════════════════════════════════════
// MÓDULO CUENTAS
// ════════════════════════════════════════

// Ayudas por tipo
const AYUDA_TIPOS = {

    Activo:
        "Los Activos tienen saldo deudor.",

    Pasivo:
        "Los Pasivos tienen saldo acreedor.",

    Capital:
        "El Capital pertenece al propietario.",

    Ingreso:
        "Los Ingresos aumentan utilidades.",

    Gasto:
        "Los Gastos disminuyen utilidades."

};

// Cambio tipo cuenta
function onNuevoTipoChange() {

    const tipo =
        document.getElementById("nueva-tipo")
            .value;

    const natural =
        document.getElementById("nueva-natural");

    // Naturaleza automática
    if (
        tipo === "Activo" ||
        tipo === "Gasto"
    ) {

        natural.value = "Debe";

    } else {

        natural.value = "Haber";

    }

    // Ayuda
    document.getElementById("ayuda-tipo")
        .textContent = AYUDA_TIPOS[tipo];

}

// Agregar cuenta
function agregarCuenta() {

    const nombre =
        document.getElementById("nueva-nombre")
            .value
            .trim();

    const tipo =
        document.getElementById("nueva-tipo")
            .value;

    const natural =
        document.getElementById("nueva-natural")
            .value;

    // Validaciones
    if (!nombre) {

        toast(
            "Escribe el nombre de la cuenta",
            false
        );

        return;

    }

    // Duplicados
    const existe = Object.values(CATALOGO)
        .some(cuenta => {

            return (
                cuenta.nombre.toLowerCase() ===
                nombre.toLowerCase()
            );

        });

    if (existe) {

        toast(
            "Ya existe una cuenta con ese nombre",
            false
        );

        return;

    }

    // Crear ID
    const id =
        siguienteIdCuenta(tipo);

    // Crear cuenta
    CATALOGO[id] = {

        nombre,

        tipo,

        natural

    };

    // Limpiar
    document.getElementById("nueva-nombre")
        .value = "";

    guardarStorage();

    renderCuentas();

    toast(
        `Cuenta agregada: ${id}`,
        true
    );

}

// Eliminar cuenta
function eliminarCuenta(id) {

    // Verificar movimientos
    const usada = PARTIDAS.some(partida => {

        return partida.movimientos.some(mov => {

            return (
                String(mov.cuentaId) ===
                String(id)
            );

        });

    });

    if (usada) {

        toast(
            "No puedes eliminar una cuenta con movimientos",
            false
        );

        return;

    }

    // Confirmación
    if (
        !confirm(
            `¿Eliminar cuenta ${id}?`
        )
    ) {
        return;
    }

    delete CATALOGO[id];

    guardarStorage();

    renderCuentas();

    toast(
        "Cuenta eliminada correctamente"
    );

}