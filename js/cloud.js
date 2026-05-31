// ════════════════════════════════════════
// SINCRONIZACION CON LA NUBE (SUPABASE)
// ════════════════════════════════════════

const SUPA_URL = "https://ebwtscmgvxdkhsqztjpe.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid3RzY21ndnhka2hzcXp0anBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMDkwNTksImV4cCI6MjA5MDY4NTA1OX0.ZB_wkO-FygLbme0CMlz-1NsX8zkOMbwhuy73pr9aYfQ";

let supa = null;

// ════════════════════════════════════════
// INICIALIZAR CLIENTE
// ════════════════════════════════════════
function initSupabase() {

    if (typeof supabase === "undefined") {

        console.warn("Libreria Supabase no disponible");

        return false;
    }

    supa = supabase.createClient(SUPA_URL, SUPA_KEY);

    return true;
}

// ════════════════════════════════════════
// HELPER: TIMEOUT PARA PROMESAS
// ════════════════════════════════════════
function conTimeout(promesa, ms, mensaje) {

    return Promise.race([
        promesa,
        new Promise((_, rej) =>
            setTimeout(
                () => rej(new Error(mensaje || "Timeout")),
                ms
            )
        )
    ]);
}

// ════════════════════════════════════════
// GUARDAR UNA CLAVE EN LA NUBE
// ════════════════════════════════════════
async function guardarEnNube(clave, valor) {

    if (!supa) return;

    try {

        const { error } = await supa
            .from("Datos")
            .upsert(
                { clave, valor: JSON.stringify(valor) },
                { onConflict: "clave" }
            );

        if (error) {
            console.warn(
                "Error guardando " + clave + ":",
                error.message
            );
        }

    } catch(e) {

        console.warn(
            "Error de red guardando " + clave
        );

    }
}

// ════════════════════════════════════════
// CARGAR TODO DESDE LA NUBE
// ════════════════════════════════════════
async function cargarDeNube() {

    if (!supa) return false;

    try {

        const { data, error } = await supa
            .from("Datos")
            .select("*");

        if (error) {

            console.error(
                "Error cargando de la nube:",
                error.message
            );

            return false;
        }

        (data || []).forEach(row => {

            try {

                if (row.clave === "info") {
                    INFO = JSON.parse(row.valor);
                }

                if (row.clave === "catalogo") {
                    CATALOGO = JSON.parse(row.valor);
                }

                if (row.clave === "partidas") {
                    PARTIDAS = JSON.parse(row.valor);
                }

            } catch(e) {

                console.warn("Error parseando " + row.clave);

            }

        });

        return data || [];

    } catch(e) {

        console.error("Error de red al cargar:", e.message);

        return false;
    }
}

// ════════════════════════════════════════
// INICIO: SINCRONIZAR AL CARGAR LA APP
// ════════════════════════════════════════
async function initCloudSync() {

    const t = document.getElementById("toast");

    if (t) {
        t.textContent = "Conectando con la nube...";
        t.className = "alert show alert-warn";
    }

    // Failsafe: si después de 16 seg sigue "Conectando", limpiar
    const failsafe = setTimeout(() => {

        if (t && t.textContent.includes("Conectando")) {
            t.className = "alert";
        }

    }, 16000);

    // Inicializar cliente Supabase
    if (!initSupabase()) {

        clearTimeout(failsafe);

        if (typeof toast === "function") {
            toast("Libreria Supabase no cargo", false);
        }

        return;
    }

    try {

        // Cargar datos de la nube (timeout 15 seg)
        const filas = await conTimeout(
            cargarDeNube(),
            15000,
            "Carga lenta de Supabase"
        );

        // Si la nube respondió, ver qué falta y guardar defaults
        if (filas !== false) {

            const claves = new Set(filas.map(r => r.clave));

            if (!claves.has("catalogo")) {
                await guardarEnNube("catalogo", CATALOGO);
            }

            if (!claves.has("info")) {
                await guardarEnNube("info", INFO);
            }

            if (!claves.has("partidas")) {
                await guardarEnNube("partidas", PARTIDAS);
            }

        }

        // Re-renderizar con los datos de la nube
        if (typeof renderHeader === "function") renderHeader();
        if (typeof renderDiario === "function") renderDiario();

        clearTimeout(failsafe);

        if (t) t.className = "alert";

        if (typeof toast === "function") {
            toast("Datos sincronizados con la nube");
        }

    } catch(e) {

        console.warn("Cloud sync issue:", e && e.message);

        clearTimeout(failsafe);

        if (typeof toast === "function") {
            toast(
                "Sin conexion a la nube — usando datos locales",
                false
            );
        }

    }
}
