// ════════════════════════════════════════
// APP PRINCIPAL
// ════════════════════════════════════════

document.addEventListener(

    "DOMContentLoaded",

    () => {

        console.clear();

        console.log(
            "Sistema iniciado"
        );

        try {

            // Cargar storage
            cargarStorage();

            // Header
            renderHeader();

            // Inicializar movimientos
            resetFormPartida();

            // Inicializar tipo
            onNuevoTipoChange();

            // Tabs
            document.querySelectorAll(".tab")
                .forEach(tab => {

                    tab.addEventListener(

                        "click",

                        () => {

                            const currentTab = tab.dataset.tab;

                            // Mostrar tab
                            showTab(currentTab);

                            // ═════════ RENDERS ═════════

                            if (currentTab === "diario") {

                                if (
                                    typeof renderDiario === "function"
                                ) {
                                    renderDiario();
                                }

                            }

                            if (currentTab === "mayor") {

                                if (
                                    typeof renderMayor === "function"
                                ) {
                                    renderMayor();
                                }

                            }

                            if (currentTab === "cuentas") {

                                if (
                                    typeof renderCuentas === "function"
                                ) {
                                    renderCuentas();
                                }

                            }

                            if (currentTab === "balance") {

                                if (
                                    typeof renderBalance === "function"
                                ) {
                                    renderBalance();
                                }

                            }

                            // 🔥 NUEVO
                            if (currentTab === "resultados") {

                                if (
                                    typeof renderResultados === "function"
                                ) {
                                    renderResultados();
                                }

                            }

                            if (currentTab === "cierre") {

                                if (
                                    typeof renderCierre === "function"
                                ) {
                                    renderCierre();
                                }

                            }

                        }

                    );

                });

            // ═════════ DIARIO ═════════

            document
                .getElementById("btn-add-mov")
                ?.addEventListener(
                    "click",
                    agregarMov
                );

            document
                .getElementById("btn-guardar-partida")
                ?.addEventListener(
                    "click",
                    guardarPartida
                );

            // ═════════ CUENTAS ═════════

            document
                .getElementById("btn-add-cuenta")
                ?.addEventListener(
                    "click",
                    agregarCuenta
                );

            document
                .getElementById("nueva-tipo")
                ?.addEventListener(
                    "change",
                    onNuevoTipoChange
                );

            // ═════════ EXPORTAR ═════════
            

document
    .getElementById("btn-export-pdf")
    ?.addEventListener(
        "click",
        exportarPDF
    );

    
            // ═════════ RESET ═════════

            document
                .getElementById("btn-reset")
                ?.addEventListener(
                    "click",
                    resetSistema
                );

       

            // ═════════ TAB INICIAL ═════════

            showTab("diario");

            // Render inicial
            if (
                typeof renderDiario === "function"
            ) {
                renderDiario();
            }

            // ═════════ SINCRONIZACION CON LA NUBE ═════════

            if (typeof initCloudSync === "function") {

                initCloudSync();

            }

            // ═════════ QR ═════════

      

            // ═════════ AUTOGUARDADO ═════════

            setInterval(() => {

                guardarStorage();

            }, 15000);

            console.log(
                "Sistema listo"
            );

        } catch(error) {

            console.error(
                "ERROR GENERAL:",
                error
            );

        }

    }

);
