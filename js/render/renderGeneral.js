// ════════════════════════════════════════
// RENDER BALANCE GENERAL
// ════════════════════════════════════════

function renderGeneral() {

    const {

        porTipo,

        totalActivos,

        totalPasivos,

        totalCapital,

        totalIngresos,

        totalGastos,

        utilidad,

        totalPC,

        cuadrado

    } = calcularBG();

    // Colores
    const COLOR = {

        Activo: "#2255cc",

        Pasivo: "#d97706",

        Capital: "#7c3aed",

        Ingreso: "#059669",

        Gasto: "#dc2626"

    };

    // Render sección
    function renderSeccion(titulo, tipo) {

        const cuentas = porTipo(tipo);

        if (!cuentas.length) return "";

        const total = cuentas.reduce(

            (sum, cuenta) => {

                return (
                    sum +
                    cuenta.saldoDebe +
                    cuenta.saldoHaber
                );

            },

            0

        );

        return `

        <div
            class="bg-sec"
            style="
                border-top:2px solid ${COLOR[tipo]}
            "
        >

            <div
                class="bg-sec-head"
                style="
                    background:${COLOR[tipo]}11
                "
            >

                <span
                    class="bg-sec-label"
                    style="
                        color:${COLOR[tipo]}
                    "
                >

                    ${titulo}

                </span>

                <span class="bg-sec-total">

                    ${Q(total)}

                </span>

            </div>

            <table>

                ${cuentas.map(cuenta => {

                    const saldo =
                        cuenta.saldoDebe +
                        cuenta.saldoHaber;

                    return `

                    <tr>

                        <td>

                            <span class="badge-id badge">

                                ${cuenta.id}

                            </span>

                            ${cuenta.nombre}

                        </td>

                        <td class="num">

                            ${Q(saldo)}

                        </td>

                    </tr>

                    `;

                }).join("")}

            </table>

        </div>

        `;

    }

    // Render completo
    document.getElementById("bg-content")
        .innerHTML = `

        <!-- HEADER -->

        <div
            class="card"
            style="
                text-align:center;
                border-top:3px solid var(--accent);
                margin-bottom:1rem
            "
        >

            <div
                style="
                    font-size:.7rem;
                    font-weight:500;
                    color:var(--ink3);
                    text-transform:uppercase;
                    letter-spacing:.07em;
                    margin-bottom:4px
                "
            >

                ${escapeHtml(INFO.universidad)}

            </div>

            <div
                style="
                    font-size:1rem;
                    font-weight:500;
                    color:var(--ink)
                "
            >

                ${escapeHtml(INFO.sistema)}
                —
                ${escapeHtml(INFO.empresa)}

            </div>

            <div
                style="
                    font-size:.8rem;
                    color:var(--ink3);
                    margin-top:2px
                "
            >

                ${escapeHtml(INFO.fecha)}
                ·
                ${escapeHtml(INFO.propietario)}

            </div>

        </div>

        <!-- ACTIVOS -->

        ${renderSeccion("Activos", "Activo")}

        <div
            class="bg-grand"
            style="
                background:var(--accent);
                margin-bottom:1rem
            "
        >

            <span class="bg-grand-label">

                Total Activos

            </span>

            <span class="bg-grand-val">

                ${Q(totalActivos)}

            </span>

        </div>

        <!-- PASIVOS -->

        ${renderSeccion("Pasivos", "Pasivo")}

        <!-- CAPITAL -->

        ${renderSeccion("Capital", "Capital")}

        <!-- RESULTADO -->

        ${
            (totalIngresos > 0 || totalGastos > 0)

            ? `

            <div
                class="bg-sec"
                style="
                    border-top:2px solid #059669
                "
            >

                <div
                    class="bg-sec-head"
                    style="
                        background:#05966911
                    "
                >

                    <span
                        class="bg-sec-label"
                        style="
                            color:#059669
                        "
                    >

                        ${
                            utilidad >= 0
                                ? "Utilidad del ejercicio"
                                : "Pérdida del ejercicio"
                        }

                    </span>

                    <span class="bg-sec-total">

                        ${Q(Math.abs(utilidad))}

                    </span>

                </div>

                <table>

                    <tr>

                        <td
                            style="
                                color:var(--ink3);
                                font-size:.78rem
                            "
                        >

                            Ingresos totales

                        </td>

                        <td class="num">

                            ${Q(totalIngresos)}

                        </td>

                    </tr>

                    <tr>

                        <td
                            style="
                                color:var(--ink3);
                                font-size:.78rem
                            "
                        >

                            Gastos totales

                        </td>

                        <td class="num">

                            ${Q(totalGastos)}

                        </td>

                    </tr>

                </table>

            </div>

            `

            : ""

        }

        <!-- TOTAL -->

        <div class="bg-grand">

            <span class="bg-grand-label">

                Total Pasivo + Capital + Resultado

            </span>

            <span class="bg-grand-val">

                ${Q(totalPC)}

            </span>

        </div>

        <!-- CUADRE -->

        <div
            class="
                cuadre
                ${
                    cuadrado
                        ? "cuadre-ok"
                        : "cuadre-err"
                }
            "
        >

            ${
                cuadrado

                ? "Balance cuadrado correctamente"

                : `Diferencia detectada: ${Q(
                    Math.abs(
                        totalActivos - totalPC
                    )
                )}`

            }

        </div>

        <!-- VACÍO -->

        ${
            (
                totalActivos === 0 &&
                totalPasivos === 0 &&
                totalCapital === 0 &&
                totalIngresos === 0 &&
                totalGastos === 0
            )

            ? `

            <div class="empty">

                <strong>
                    No existen datos todavía
                </strong>

                Registra partidas en el Libro Diario.

            </div>

            `

            : ""

        }

    `;

}