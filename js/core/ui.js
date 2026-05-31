// ════════════════════════════════════════
// UI GENERAL
// ════════════════════════════════════════

// Mostrar tabs
function showTab(id) {

    // Tabs
    document.querySelectorAll(".tab")
        .forEach(tab => {

            tab.classList.remove("active");

            if (tab.dataset.tab === id) {

                tab.classList.add("active");

            }

        });

    // Panels
    document.querySelectorAll(".panel")
        .forEach(panel => {

            panel.classList.remove("active");

        });

    const panel =
        document.getElementById(`panel-${id}`);

    if (panel) {

        panel.classList.add("active");

    }

    // Render dinámico
    try {

        switch(id) {

            case "diario":

                if (
                    typeof renderDiario === "function"
                ) {

                    renderDiario();

                }

            break;

            case "mayor":

                if (
                    typeof renderMayor === "function"
                ) {

                    renderMayor();

                }

            break;

            case "cuentas":

                if (
                    typeof renderCuentas === "function"
                ) {

                    renderCuentas();

                }

            break;

            case "balance":

                if (
                    typeof renderBalance === "function"
                ) {

                    renderBalance();

                }

            break;

            case "general":

                if (
                    typeof renderGeneral === "function"
                ) {

                    renderGeneral();

                }

            break;

        }

    } catch(error) {

        console.error(
            "Error cambiando tab:",
            error
        );

    }

}

// Render header
function renderHeader() {

    const hdrSistema =
        document.getElementById("hdr-sistema");

    const hdrEmpresa =
        document.getElementById("hdr-empresa");

    const hdrPeriodo =
        document.getElementById("hdr-periodo");

    const hdrPropietario =
        document.getElementById("hdr-propietario");

    if (hdrSistema)
        hdrSistema.textContent = INFO.sistema;

    if (hdrEmpresa)
        hdrEmpresa.textContent = INFO.empresa;

    if (hdrPeriodo)
        hdrPeriodo.textContent = INFO.fecha;

    if (hdrPropietario)
        hdrPropietario.textContent = INFO.propietario;

    document.title = INFO.sistema;

}