// ════════════════════════════════════════
// RENDER BALANCE
// ════════════════════════════════════════

function renderBalance() {

    const filas = calcularBalance();

    // Totales
    const totalDebe = filas.reduce(
        (sum, fila) => sum + fila.totalDebe,
        0
    );

    const totalHaber = filas.reduce(
        (sum, fila) => sum + fila.totalHaber,
        0
    );

    const saldoDebe = filas.reduce(
        (sum, fila) => sum + fila.saldoDebe,
        0
    );

    const saldoHaber = filas.reduce(
        (sum, fila) => sum + fila.saldoHaber,
        0
    );

    // Métricas
    document.getElementById("metrics-wrap")
        .innerHTML = `

        <div class="metric">

            <div class="metric-label">
                Cuentas con saldo
            </div>

            <div class="metric-val">
                ${filas.length}
            </div>

        </div>

        <div class="metric">

            <div class="metric-label">
                Sumas Debe
            </div>

            <div class="metric-val">
                ${Q(totalDebe)}
            </div>

        </div>

        <div class="metric">

            <div class="metric-label">
                Sumas Haber
            </div>

            <div class="metric-val">
                ${Q(totalHaber)}
            </div>

        </div>

    `;

    // Validar cuadre
    const okSumas =
        Math.abs(totalDebe - totalHaber) < 0.01;

    const okSaldos =
        Math.abs(saldoDebe - saldoHaber) < 0.01;

    const cuadre =
        document.getElementById("cuadre-saldos");

    if (okSumas && okSaldos) {

        cuadre.className =
            "cuadre cuadre-ok";

        cuadre.textContent =
            "Balance cuadrado correctamente";

    } else {

        cuadre.className =
            "cuadre cuadre-err";

        cuadre.textContent =
            "Diferencia detectada en balance";

    }

    // Tabla
    const body =
        document.getElementById("balance-body");

    // Vacío
    if (!filas.length) {

        body.innerHTML = `

        <tr>

            <td colspan="7"
                style="
                    text-align:center;
                    padding:2rem;
                    color:#888;
                "
            >

                No existen movimientos registrados

            </td>

        </tr>

        `;

        return;

    }

    // Render
    body.innerHTML = filas.map(fila => {

        return `

        <tr>

            <td
                style="
                    font-family:var(--mono);
                    font-size:.78rem
                "
            >

                ${fila.id}

            </td>

            <td>

                ${fila.nombre}

            </td>

            <td>

                <span class="${bCl(fila.tipo)}">

                    ${fila.tipo}

                </span>

            </td>

            <td class="num">

                ${Q(fila.totalDebe)}

            </td>

            <td class="num">

                ${Q(fila.totalHaber)}

            </td>

            <td class="num">

                ${
                    fila.saldoDebe > 0
                        ? Q(fila.saldoDebe)
                        : "—"
                }

            </td>

            <td class="num">

                ${
                    fila.saldoHaber > 0
                        ? Q(fila.saldoHaber)
                        : "—"
                }

            </td>

        </tr>

        `;

    }).join("") +

    `

    <tr class="total-row">

        <td colspan="3">

            TOTALES

        </td>

        <td class="num">

            ${Q(totalDebe)}

        </td>

        <td class="num">

            ${Q(totalHaber)}

        </td>

        <td class="num">

            ${Q(saldoDebe)}

        </td>

        <td class="num">

            ${Q(saldoHaber)}

        </td>

    </tr>

    `;

}