// ════════════════════════════════════════
// LIBRO DIARIO
// ════════════════════════════════════════

let partidaEditando = null;

// Construir opciones del select de cuentas
function buildCuentaOptions() {

    let html = `<option value="">— Selecciona —</option>`;

    const tipos = [
        "Activo",
        "Pasivo",
        "Capital",
        "Ingreso",
        "Gasto"
    ];

    tipos.forEach(tipo => {

        const ids = Object.keys(CATALOGO)
            .filter(id => CATALOGO[id].tipo === tipo)
            .sort((a, b) => parseInt(a) - parseInt(b));

        if (!ids.length) return;

        html += `<optgroup label="${tipo}">`;

        ids.forEach(id => {

            const cuenta = CATALOGO[id];

            html += `
                <option value="${id}">
                    ${id} — ${cuenta.nombre}
                </option>
            `;

        });

        html += `</optgroup>`;

    });

    return html;

}

// ════════════════════════════════════════
// AGREGAR MOVIMIENTO
// ════════════════════════════════════════

function agregarMov() {

    movsActuales.push({
        cuentaId: "",
        debe: 0,
        haber: 0
    });

    renderMovsForm();

}

// ════════════════════════════════════════
// QUITAR MOVIMIENTO
// ════════════════════════════════════════

function quitarMov(index) {

    movsActuales.splice(index, 1);

    if (movsActuales.length === 0) {

        movsActuales.push({
            cuentaId: "",
            debe: 0,
            haber: 0
        });

        movsActuales.push({
            cuentaId: "",
            debe: 0,
            haber: 0
        });

    }

    renderMovsForm();

}

// ════════════════════════════════════════
// ACTUALIZAR CUADRE
// ════════════════════════════════════════

function actualizarCuadre() {

    const totalDebe = movsActuales.reduce(
        (sum, mov) => sum + (Number(mov.debe) || 0),
        0
    );

    const totalHaber = movsActuales.reduce(
        (sum, mov) => sum + (Number(mov.haber) || 0),
        0
    );

    const totalDebeEl = document.getElementById("tot-debe");
    const totalHaberEl = document.getElementById("tot-haber");
    const cuadro = document.getElementById("cuadre-partida");
    const btnGuardar = document.getElementById("btn-guardar-partida");

    if (totalDebeEl) totalDebeEl.textContent = Q(totalDebe);
    if (totalHaberEl) totalHaberEl.textContent = Q(totalHaber);

    if (!cuadro || !btnGuardar) return;

    const diferencia = Math.abs(totalDebe - totalHaber);

    if (movsActuales.length < 2) {

        cuadro.className = "cuadre cuadre-warn";
        cuadro.textContent = "Agrega al menos dos movimientos";
        btnGuardar.disabled = true;
        return;

    }

    if (totalDebe === 0 && totalHaber === 0) {

        cuadro.className = "cuadre cuadre-warn";
        cuadro.textContent = "Ingresa los montos";
        btnGuardar.disabled = true;
        return;

    }

    if (diferencia < 0.01) {

        cuadro.className = "cuadre cuadre-ok";
        cuadro.textContent = partidaEditando === null
            ? "Partida cuadrada — Debe = Haber"
            : "Partida lista para actualizar";
        btnGuardar.disabled = false;

    } else {

        cuadro.className = "cuadre cuadre-err";
        cuadro.textContent = `Diferencia de ${Q(diferencia)}`;
        btnGuardar.disabled = true;

    }

}

// ════════════════════════════════════════
// VALIDAR MOVIMIENTOS
// ════════════════════════════════════════

function obtenerMovimientosValidos() {

    const movimientos = movsActuales.filter(m => {

        return (
            m.cuentaId &&
            (
                (Number(m.debe) || 0) > 0 ||
                (Number(m.haber) || 0) > 0
            )
        );

    });

    if (movimientos.length < 2) {

        toast("La partida necesita mínimo 2 movimientos", false);
        return null;

    }

    for (const mov of movimientos) {

        if (
            (Number(mov.debe) || 0) > 0 &&
            (Number(mov.haber) || 0) > 0
        ) {

            toast("Una línea no puede tener Debe y Haber al mismo tiempo", false);
            return null;

        }

    }

    const totalDebe = movimientos.reduce(
        (sum, mov) => sum + (Number(mov.debe) || 0),
        0
    );

    const totalHaber = movimientos.reduce(
        (sum, mov) => sum + (Number(mov.haber) || 0),
        0
    );

    if (Math.abs(totalDebe - totalHaber) > 0.01) {

        toast("La partida no está cuadrada", false);
        return null;

    }

    return movimientos.map(m => ({
        cuentaId: m.cuentaId,
        debe: Number(m.debe) || 0,
        haber: Number(m.haber) || 0
    }));

}

// ════════════════════════════════════════
// REINICIAR FORMULARIO
// ════════════════════════════════════════

function resetFormPartida() {

    partidaEditando = null;

    movsActuales = [
        {
            cuentaId: "",
            debe: 0,
            haber: 0
        },
        {
            cuentaId: "",
            debe: 0,
            haber: 0
        }
    ];

    const fecha = document.getElementById("part-fecha");
    const desc = document.getElementById("part-desc");
    const num = document.getElementById("part-num");
    const btn = document.getElementById("btn-guardar-partida");

    if (fecha) fecha.value = hoy();
    if (desc) desc.value = "";
    if (num) num.value = `Partida N° ${siguienteNumPartida()}`;
    if (btn) btn.textContent = "Guardar partida";

    renderMovsForm();

}

// ════════════════════════════════════════
// RENDER GLOBAL
// ════════════════════════════════════════

function refrescarReportes() {

    if (typeof renderDiario === "function") renderDiario();
    if (typeof renderMayor === "function") renderMayor();
    if (typeof renderBalance === "function") renderBalance();
    if (typeof renderResultados === "function") renderResultados();
    if (typeof renderGeneral === "function") renderGeneral();

}

// ════════════════════════════════════════
// GUARDAR PARTIDA
// ════════════════════════════════════════

function guardarPartida() {

    if (partidaEditando !== null) {

        actualizarPartida();
        return;

    }

    const fecha = document.getElementById("part-fecha").value;

    const descripcion = document
        .getElementById("part-desc")
        .value
        .trim();

    if (!fecha) {

        toast("Selecciona una fecha", false);
        return;

    }

    if (!descripcion) {

        toast("Escribe una descripción", false);
        return;

    }

    const movimientos = obtenerMovimientosValidos();

    if (!movimientos) return;

    PARTIDAS.push({
        id: siguienteNumPartida(),
        fecha,
        descripcion,
        movimientos
    });

    guardarStorage();

    resetFormPartida();

    refrescarReportes();

    toast("Partida registrada correctamente");

}

// ════════════════════════════════════════
// EDITAR PARTIDA
// ════════════════════════════════════════

function editarPartida(id) {

    const partida = PARTIDAS.find(
        p => Number(p.id) === Number(id)
    );

    if (!partida) {

        toast("Partida no encontrada", false);
        return;

    }

    partidaEditando = partida.id;

    const fecha = document.getElementById("part-fecha");
    const desc = document.getElementById("part-desc");
    const num = document.getElementById("part-num");
    const btn = document.getElementById("btn-guardar-partida");

    if (fecha) fecha.value = partida.fecha;
    if (desc) desc.value = partida.descripcion;
    if (num) num.value = `Editando Partida N° ${partida.id}`;
    if (btn) btn.textContent = "Actualizar partida";

    movsActuales = partida.movimientos.map(m => ({
        cuentaId: m.cuentaId,
        debe: Number(m.debe) || 0,
        haber: Number(m.haber) || 0
    }));

    renderMovsForm();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    toast("Modo edición activado");

}

// ════════════════════════════════════════
// ACTUALIZAR PARTIDA
// ════════════════════════════════════════

function actualizarPartida() {

    const indice = PARTIDAS.findIndex(
        p => Number(p.id) === Number(partidaEditando)
    );

    if (indice < 0) {

        toast("Partida no encontrada", false);
        return;

    }

    const fecha = document.getElementById("part-fecha").value;

    const descripcion = document
        .getElementById("part-desc")
        .value
        .trim();

    if (!fecha) {

        toast("Selecciona una fecha", false);
        return;

    }

    if (!descripcion) {

        toast("Escribe una descripción", false);
        return;

    }

    const movimientos = obtenerMovimientosValidos();

    if (!movimientos) return;

    PARTIDAS[indice] = {
        id: partidaEditando,
        fecha,
        descripcion,
        movimientos
    };

    guardarStorage();

    resetFormPartida();

    refrescarReportes();

    toast("Partida actualizada correctamente");

}

// ════════════════════════════════════════
// ELIMINAR PARTIDA
// ════════════════════════════════════════

function eliminarPartida(id) {

    if (!confirm(`¿Eliminar Partida N° ${id}?`)) {
        return;
    }

    PARTIDAS = PARTIDAS.filter(
        partida => Number(partida.id) !== Number(id)
    );

    if (Number(partidaEditando) === Number(id)) {
        resetFormPartida();
    }

    guardarStorage();

    refrescarReportes();

    toast("Partida eliminada");

}