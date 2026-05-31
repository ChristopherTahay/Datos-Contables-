// ════════════════════════════════════════
// STORAGE CENTRAL
// ════════════════════════════════════════

function guardarStorage() {

    localStorage.setItem(
        APP_CONFIG.storageKeys.info,
        JSON.stringify(INFO)
    );

    localStorage.setItem(
        APP_CONFIG.storageKeys.catalogo,
        JSON.stringify(CATALOGO)
    );

    localStorage.setItem(
        APP_CONFIG.storageKeys.partidas,
        JSON.stringify(PARTIDAS)
    );

    // Sincronizar con la nube (si esta disponible)
    if (typeof guardarEnNube === "function") {

        guardarEnNube("info", INFO);
        guardarEnNube("catalogo", CATALOGO);
        guardarEnNube("partidas", PARTIDAS);

    }

    console.log("Datos guardados");
}

// Cargar datos
function cargarStorage() {

    try {

        const info = localStorage.getItem(APP_CONFIG.storageKeys.info);
        const catalogo = localStorage.getItem(APP_CONFIG.storageKeys.catalogo);
        const partidas = localStorage.getItem(APP_CONFIG.storageKeys.partidas);

        if (info) INFO = JSON.parse(info);

        if (catalogo) CATALOGO = JSON.parse(catalogo);

        if (partidas) PARTIDAS = JSON.parse(partidas);

    } catch (error) {

        console.error("Error cargando datos:", error);

    }

}

// Reset total
function resetSistema() {

    if (!confirm("¿Reiniciar sistema completo?")) return;

    localStorage.clear();

    location.reload();
}

// Exportar JSON
function exportarJSON() {

    const data = {
        info: INFO,
        catalogo: CATALOGO,
        partidas: PARTIDAS
    };

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "sistema-contable.json";

    a.click();

    URL.revokeObjectURL(url);

    toast("Backup JSON exportado");
}

// Importar JSON
function importarJSON(event) {

    const archivo = event.target.files[0];

    if (!archivo) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        try {

            const data = JSON.parse(e.target.result);

            INFO = data.info || INFO;
            CATALOGO = data.catalogo || CATALOGO;
            PARTIDAS = data.partidas || PARTIDAS;

            guardarStorage();

            location.reload();

        } catch(error) {

            toast("Archivo JSON inválido", false);

        }

    };

    reader.readAsText(archivo);
}