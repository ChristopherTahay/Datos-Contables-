// ════════════════════════════════════════
// RENDER LIBRO MAYOR
// ════════════════════════════════════════

function renderMayor() {

    const mayor = calcularMayor();

    const cuentasUsadas =
        Object.keys(mayor)
            .sort((a, b) => parseInt(a) - parseInt(b));

    // Métricas
    const totalDebe = cuentasUsadas.reduce(

        (sum, id) => sum + mayor[id].totalDebe,

        0

    );

    const totalHaber = cuentasUsadas.reduce(

        (sum, id) => sum + mayor[id].totalHaber,

        0

    );

    document.getElementById("mayor-metrics")
        .innerHTML = `

        <div class="metric">

            <div class="metric-label">
                Cuentas con movimiento
            </div>

            <div class="metric-val">
                ${cuentasUsadas.length}
            </div>

        </div>

        <div class="metric">

            <div class="metric-label">
                Total Debe
            </div>

            <div class="metric-val">
                ${Q(totalDebe)}
            </div>

        </div>

        <div class="metric">

            <div class="metric-label">
                Total Haber
            </div>

            <div class="metric-val">
                ${Q(totalHaber)}
            </div>

        </div>

    `;

    // Contenedor
    const contenedor =
        document.getElementById("mayor-content");

    // Vacío
    if (!cuentasUsadas.length) {

        contenedor.innerHTML = `

        <div class="empty">

            <strong>
                El Libro Mayor está vacío
            </strong>

            Registra partidas en el Diario.

        </div>

        `;

        return;

    }

    // Renderizar cuentas
    contenedor.innerHTML = cuentasUsadas.map(id => {

        const cuenta = CATALOGO[id];

        const mayorCuenta = mayor[id];

        const neto =
            mayorCuenta.totalDebe -
            mayorCuenta.totalHaber;

        let saldo = "";

        if (neto > 0) {

            saldo =
                `Saldo Deudor: ${Q(neto)}`;

        } else if (neto < 0) {

            saldo =
                `Saldo Acreedor: ${Q(-neto)}`;

        } else {

            saldo = "Saldo: Q 0.00";

        }

        return `

        <div class="mayor-cuenta">

            <div class="mayor-cuenta-head">

                <span class="mayor-cuenta-titulo">

                    <span class="badge-id badge"
                        style="
                            background:rgba(255,255,255,.15);
                            color:#fff;
                            border-color:rgba(255,255,255,.4)
                        "
                    >

                        ${id}

                    </span>

                    ${cuenta.nombre}

                </span>

                <span class="mayor-saldo-pill">
                    ${saldo}
                </span>

            </div>

            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th style="width:90px">
                                Fecha
                            </th>

                            <th style="width:80px">
                                Partida
                            </th>

                            <th>
                                Concepto
                            </th>

                            <th class="num">
                                Debe (Q)
                            </th>

                            <th class="num">
                                Haber (Q)
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${mayorCuenta.movs.map(mov => {

                            return `

                            <tr>

                                <td
                                    style="
                                        font-family:var(--mono);
                                        font-size:.75rem
                                    "
                                >

                                    ${fmtFecha(mov.fecha)}

                                </td>

                                <td
                                    style="
                                        font-family:var(--mono);
                                        font-size:.75rem
                                    "
                                >

                                    N° ${mov.partidaId}

                                </td>

                                <td>

                                    ${escapeHtml(mov.descripcion)}

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

                            <td colspan="3">
                                Totales
                            </td>

                            <td class="num">
                                ${Q(mayorCuenta.totalDebe)}
                            </td>

                            <td class="num">
                                ${Q(mayorCuenta.totalHaber)}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

        `;

    }).join("");

}