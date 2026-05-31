// ════════════════════════════════════════
// RENDER BALANCE GENERAL FINAL
// ════════════════════════════════════════

function renderCierre() {

    const container =
        document.getElementById(
            "bg-content"
        );

    if (!container) return;

    // ═════════ DATOS ═════════

    const activos = [];
    const pasivos = [];
    const capitales = [];

    let totalActivos = 0;
    let totalPasivos = 0;
    let totalCapital = 0;

    // Recorrer catálogo
    Object.entries(CATALOGO).forEach(

        ([codigo, cuenta]) => {

            // IGNORAR ingresos y gastos
            if (

                cuenta.tipo === "Ingreso" ||
                cuenta.tipo === "Gasto"

            ) {
                return;
            }

            let debe = 0;
            let haber = 0;

            // Recorrer partidas
            PARTIDAS.forEach(partida => {

                if (!partida.movimientos) return;

                partida.movimientos.forEach(mov => {

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

            // Ignorar cuentas vacías
            if (saldo === 0) return;

            const item = {

                codigo,
                nombre: cuenta.nombre,
                saldo

            };

            // ═════════ ACTIVOS ═════════

            if (cuenta.tipo === "Activo") {

                activos.push(item);

                totalActivos += saldo;

            }

            // ═════════ PASIVOS ═════════

            if (cuenta.tipo === "Pasivo") {

                pasivos.push(item);

                totalPasivos += saldo;

            }

            // ═════════ CAPITAL ═════════

            if (cuenta.tipo === "Capital") {

                capitales.push(item);

                totalCapital += saldo;

            }

        }

    );

    // ═════════ RENDER ═════════

    container.innerHTML = `

        <div class="metrics">

            <div class="metric-card">

                <div class="metric-label">
                    Total Activos
                </div>

                <div class="metric-value">
                    ${Q(totalActivos)}
                </div>

            </div>

            <div class="metric-card">

                <div class="metric-label">
                    Total Pasivos
                </div>

                <div class="metric-value">
                    ${Q(totalPasivos)}
                </div>

            </div>

            <div class="metric-card">

                <div class="metric-label">
                    Total Capital
                </div>

                <div class="metric-value">
                    ${Q(totalCapital)}
                </div>

            </div>

        </div>

        <div class="grid-2">

            <!-- ACTIVOS -->

            <div class="card card-flat">

                <div class="card-title">
                    Activos
                </div>

                <div class="table-wrap">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Cuenta
                                </th>

                                <th class="num">
                                    Saldo
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            ${activos.map(c => `

                                <tr>

                                    <td>
                                        ${c.nombre}
                                    </td>

                                    <td class="num">
                                        ${Q(c.saldo)}
                                    </td>

                                </tr>

                            `).join("")}

                            <tr class="total-row">

                                <td>
                                    TOTAL ACTIVOS
                                </td>

                                <td class="num">
                                    ${Q(totalActivos)}
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

            <!-- PASIVOS + CAPITAL -->

            <div>

                <div class="card card-flat">

                    <div class="card-title">
                        Pasivos
                    </div>

                    <div class="table-wrap">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Cuenta
                                    </th>

                                    <th class="num">
                                        Saldo
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                ${pasivos.map(c => `

                                    <tr>

                                        <td>
                                            ${c.nombre}
                                        </td>

                                        <td class="num">
                                            ${Q(c.saldo)}
                                        </td>

                                    </tr>

                                `).join("")}

                                <tr class="total-row">

                                    <td>
                                        TOTAL PASIVOS
                                    </td>

                                    <td class="num">
                                        ${Q(totalPasivos)}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                <div class="card card-flat mt-16">

                    <div class="card-title">
                        Capital
                    </div>

                    <div class="table-wrap">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Cuenta
                                    </th>

                                    <th class="num">
                                        Saldo
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                ${capitales.map(c => `

                                    <tr>

                                        <td>
                                            ${c.nombre}
                                        </td>

                                        <td class="num">
                                            ${Q(c.saldo)}
                                        </td>

                                    </tr>

                                `).join("")}

                                <tr class="total-row">

                                    <td>
                                        TOTAL CAPITAL
                                    </td>

                                    <td class="num">
                                        ${Q(totalCapital)}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    `;

}