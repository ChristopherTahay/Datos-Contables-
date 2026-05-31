// ════════════════════════════════════════
// RENDER CUENTAS
// ════════════════════════════════════════

function renderCuentas() {

    const ids = Object.keys(CATALOGO)
        .sort((a, b) => parseInt(a) - parseInt(b));

    // Contador
    document.getElementById("cnt-cuentas")
        .textContent =

        `${ids.length} ${
            ids.length === 1
                ? "cuenta"
                : "cuentas"
        }`;

    // Tabla
    document.getElementById("tabla-cuentas")
        .innerHTML = ids.map(id => {

            const cuenta = CATALOGO[id];

            return `

            <tr>

                <td
                    style="
                        font-family:var(--mono);
                        font-size:.78rem;
                        font-weight:600
                    "
                >

                    ${id}

                </td>

                <td>

                    ${cuenta.nombre}

                </td>

                <td>

                    <span class="${bCl(cuenta.tipo)}">

                        ${cuenta.tipo}

                    </span>

                </td>

                <td
                    style="
                        font-size:.75rem;
                        color:var(--ink3)
                    "
                >

                    ${cuenta.natural}

                </td>

                <td>

                    <button
                        class="btn-x"
                        onclick="eliminarCuenta('${id}')"
                    >

                        ✕

                    </button>

                </td>

            </tr>

            `;

        }).join("");

}