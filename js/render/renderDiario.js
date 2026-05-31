// ════════════════════════════════════════
// RENDER LIBRO DIARIO
// ════════════════════════════════════════

// Render movimientos
function renderMovsForm() {

    const wrap =
        document.getElementById("movs-wrap");

    if (!wrap) return;

    wrap.innerHTML = "";

    movsActuales.forEach((mov, i) => {

        const row =
            document.createElement("div");

        row.className = "mov-grid";

        // SELECT CUENTA
        const select =
            document.createElement("select");

        select.innerHTML =
            buildCuentaOptions();

        select.value =
            mov.cuentaId || "";

        select.addEventListener(
            "change",
            e => {

                movsActuales[i].cuentaId =
                    e.target.value;

                actualizarCuadre();

            }
        );

        // DEBE
        const debe =
            document.createElement("input");

        debe.type = "number";

        debe.step = "0.01";

        debe.min = "0";

        debe.placeholder = "0.00";

        debe.className = "num";

        debe.value =
            mov.debe || "";

        debe.addEventListener(
            "input",
            e => {

                movsActuales[i].debe =
                    parseFloat(e.target.value) || 0;

                actualizarCuadre();

            }
        );

        // HABER
        const haber =
            document.createElement("input");

        haber.type = "number";

        haber.step = "0.01";

        haber.min = "0";

        haber.placeholder = "0.00";

        haber.className = "num";

        haber.value =
            mov.haber || "";

        haber.addEventListener(
            "input",
            e => {

                movsActuales[i].haber =
                    parseFloat(e.target.value) || 0;

                actualizarCuadre();

            }
        );

        // BOTON ELIMINAR MOVIMIENTO
        const btn =
            document.createElement("button");

        btn.className = "btn-x";

        btn.textContent = "✕";

        btn.addEventListener(
            "click",
            () => {

                quitarMov(i);

            }
        );

        row.appendChild(select);

        row.appendChild(debe);

        row.appendChild(haber);

        row.appendChild(btn);

        wrap.appendChild(row);

    });

    actualizarCuadre();

}

// ════════════════════════════════════════
// RENDER LIBRO DIARIO
// ════════════════════════════════════════

function renderDiario() {

    const inputNum =
        document.getElementById("part-num");

    if (inputNum) {

        if (
            typeof partidaEditando === "undefined" ||
            partidaEditando === null
        ) {

            inputNum.value =
                `Partida N° ${siguienteNumPartida()}`;

        }

    }

    // Fecha
    const fechaInput =
        document.getElementById("part-fecha");

    if (
        fechaInput &&
        !fechaInput.value
    ) {

        fechaInput.value = hoy();

    }

    // Inicializar movimientos
    if (!movsActuales.length) {

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

    }

    renderMovsForm();

    const lista =
        document.getElementById("lista-partidas");

    if (!lista) return;

    const contador =
        document.getElementById("cnt-partidas");

    if (contador) {

        contador.textContent =
            `${PARTIDAS.length} ${
                PARTIDAS.length === 1
                    ? "partida"
                    : "partidas"
            }`;

    }

    // Sin partidas
    if (!PARTIDAS.length) {

        lista.innerHTML = `

        <div class="empty">

            <strong>
                Aún no hay partidas registradas
            </strong>

        </div>

        `;

        return;

    }

    lista.innerHTML = PARTIDAS.map(partida => {

        const totalDebe =
            partida.movimientos.reduce(

                (sum, mov) =>
                    sum + (mov.debe || 0),

                0

            );

        const totalHaber =
            partida.movimientos.reduce(

                (sum, mov) =>
                    sum + (mov.haber || 0),

                0

            );

        return `

        <div class="partida">

            <div class="partida-head">

                <span class="partida-num">

                    Partida N° ${partida.id}

                </span>

                <span class="partida-desc">

                    ${escapeHtml(
                        partida.descripcion
                    )}

                </span>

                <span class="partida-fecha">

                    ${fmtFecha(
                        partida.fecha
                    )}

                </span>

                <button
                    class="btn btn-secondary"
                    onclick="editarPartida(${partida.id})"
                >

                    ✏ Editar

                </button>

                <button
                    class="btn-x"
                    onclick="eliminarPartida(${partida.id})"
                >

                    ✖

                </button>

            </div>

            <table>

                <tbody>

                ${partida.movimientos.map(mov => {

                    const cuenta =
                        CATALOGO[mov.cuentaId];

                    return `

                    <tr>

                        <td>

                            <span
                                class="
                                    badge-id
                                    badge
                                "
                            >

                                ${mov.cuentaId}

                            </span>

                            ${cuenta?.nombre || ""}

                        </td>

                        <td class="num">

                            ${
                                mov.debe > 0
                                ? Q(mov.debe)
                                : "—"
                            }

                        </td>

                        <td class="num">

                            ${
                                mov.haber > 0
                                ? Q(mov.haber)
                                : "—"
                            }

                        </td>

                    </tr>

                    `;

                }).join("")}

                <tr class="total-row">

                    <td>

                        Totales

                    </td>

                    <td class="num">

                        ${Q(totalDebe)}

                    </td>

                    <td class="num">

                        ${Q(totalHaber)}

                    </td>

                </tr>

                </tbody>

            </table>

        </div>

        `;

    }).join("");

}