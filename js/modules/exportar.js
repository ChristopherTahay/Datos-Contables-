// ════════════════════════════════════════
// EXPORTACIÓN PDF
// ════════════════════════════════════════

function exportarPDF() {

    try {

        // Actualizar todos los reportes
        if (typeof renderDiario === "function") {
            renderDiario();
        }

        if (typeof renderMayor === "function") {
            renderMayor();
        }

        if (typeof renderBalance === "function") {
            renderBalance();
        }

        if (typeof renderResultados === "function") {
            renderResultados();
        }

        if (typeof renderGeneral === "function") {
            renderGeneral();
        }

        // Mostrar todas las pestañas
        document
            .querySelectorAll(".panel")
            .forEach(panel => {

                panel.classList.add("active");

            });

        setTimeout(() => {

            window.print();

            setTimeout(() => {

                // Ocultar todas
                document
                    .querySelectorAll(".panel")
                    .forEach(panel => {

                        panel.classList.remove("active");

                    });

                // Regresar a Exportar
                const exportar =
                    document.getElementById(
                        "panel-exportar"
                    );

                if (exportar) {

                    exportar.classList.add(
                        "active"
                    );

                }

            }, 500);

        }, 100);

    } catch(error) {

        console.error(error);

        alert(
            "Error al generar PDF"
        );

    }

}

// ════════════════════════════════════════
// REINICIAR SISTEMA
// ════════════════════════════════════════

function resetSistema() {

    const confirmar = confirm(

        "¿Desea reiniciar completamente el sistema?\n\n" +

        "Se eliminarán todas las partidas y cuentas creadas."

    );

    if (!confirmar) {

        return;

    }

    localStorage.clear();

    alert(
        "Sistema reiniciado correctamente."
    );

    location.reload();

}