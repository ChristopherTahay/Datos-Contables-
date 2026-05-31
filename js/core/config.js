// ════════════════════════════════════════
// CONFIGURACIÓN GENERAL DEL SISTEMA
// ════════════════════════════════════════

const APP_CONFIG = {
    nombre: "Sistema Contable",
    version: "2.0",
    moneda: "Q",
    fechaFormato: "es-GT",

    storageKeys: {
        info: "conta_info",
        catalogo: "conta_catalogo",
        partidas: "conta_partidas"
    }
};

// Información inicial del sistema
const INFO_DEFAULT = {
    sistema: "Sistema Contable",
    empresa: "Los Meros Meros en Conta",
    universidad: "Universidad Mariano Galvez de Guatemala",
    carrera: "Ingenieria en Sistemas — Plan Domingo",
    fecha: "Al 01 de enero de 2026",
    propietario: "Sra. Roselyn Perdomo"
};