// ════════════════════════════════════════
// HELPERS GLOBALES
// ════════════════════════════════════════

// Formato moneda
function Q(valor = 0) {
    return `${APP_CONFIG.moneda} ${Number(valor).toLocaleString("es-GT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// Fecha actual
function hoy() {
    return new Date().toISOString().slice(0, 10);
}

// Formato fecha
function fmtFecha(fecha) {

    if (!fecha) return "";

    const [y, m, d] = fecha.split("-");

    return `${d}/${m}/${y}`;
}

// Escapar HTML
function escapeHtml(texto = "") {

    return String(texto).replace(/[&<>"']/g, function (m) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[m];

    });

}

// Generar ID
function generarID() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// Badge class
function bCl(tipo = "") {
    return "badge b-" + tipo.toLowerCase();
}

// Toast global
function toast(mensaje, ok = true) {

    const el = document.getElementById("toast");

    if (!el) return;

    el.textContent = mensaje;

    el.className = ok
        ? "alert show alert-ok"
        : "alert show alert-err";

    clearTimeout(el._timeout);

    el._timeout = setTimeout(() => {
        el.className = "alert";
    }, 3000);
}