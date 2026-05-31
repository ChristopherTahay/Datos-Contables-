// ════════════════════════════════════════
// RENDER ESTADO DE RESULTADOS
// ════════════════════════════════════════

function renderResultados() {

    const body =
        document.getElementById(
            "resultados-body"
        );

    const metrics =
        document.getElementById(
            "resultados-metrics"
        );

    if (!body || !metrics) return;

    // Obtener datos
    const data =
        calcularResultados();

    // Limpiar
    body.innerHTML = "";

    // ═════════ MÉTRICAS ═════════

    metrics.innerHTML = `

        <div class="metric-card">

            <div class="metric-label">
                Total Ingresos
            </div>

            <div class="metric-value">
                ${Q(data.ingresos)}
            </div>

        </div>

        <div class="metric-card">

            <div class="metric-label">
                Total Gastos
            </div>

            <div class="metric-value">
                ${Q(data.gastos)}
            </div>

        </div>

        <div class="metric-card">

            <div class="metric-label">
                Utilidad / Pérdida
            </div>

            <div class="metric-value">
                ${Q(data.utilidad)}
            </div>

        </div>

    `;

    // ═════════ SIN DATOS ═════════

    if (!data.cuentas.length) {

        body.innerHTML = `

            <tr>

                <td colspan="3" class="text-center">

                    No existen cuentas de resultados

                </td>

            </tr>

        `;

        return;

    }

    // ═════════ FILAS ═════════

    data.cuentas.forEach(cuenta => {

        body.innerHTML += `

            <tr>

                <td>
                    ${cuenta.nombre}
                </td>

                <td>

                    <span class="badge badge-${cuenta.tipo.toLowerCase()}">

                        ${cuenta.tipo}

                    </span>

                </td>

                <td class="num">

                    ${Q(cuenta.saldo)}

                </td>

            </tr>

        `;

    });

    // ═════════ UTILIDAD FINAL ═════════

    body.innerHTML += `

        <tr class="total-row">

            <td colspan="2">

                <strong>
                    UTILIDAD DEL EJERCICIO
                </strong>

            </td>

            <td class="num">

                <strong>
                    ${Q(data.utilidad)}
                </strong>

            </td>

        </tr>

    `;

}