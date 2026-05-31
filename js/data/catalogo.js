// ════════════════════════════════════════
// CATÁLOGO CONTABLE
// ════════════════════════════════════════

const CATALOGO_DEFAULT = {

    // ═════════ ACTIVOS ═════════

    101: {
        nombre: "Caja y Bancos",
        tipo: "Activo",
        natural: "Debe"
    },

    111: {
        nombre: "Caja Chica",
        tipo: "Activo",
        natural: "Debe"
    },

    121: {
        nombre: "Clientes",
        tipo: "Activo",
        natural: "Debe"
    },

    131: {
        nombre: "Inventario inicial de mercancias",
        tipo: "Activo",
        natural: "Debe"
    },

    141: {
        nombre: "Seguros pagados por anticipado",
        tipo: "Activo",
        natural: "Debe"
    },

    151: {
        nombre: "Alquileres pagados por anticipado",
        tipo: "Activo",
        natural: "Debe"
    },

    161: {
        nombre: "Vehiculos",
        tipo: "Activo",
        natural: "Debe"
    },

    171: {
        nombre: "Mobiliario y equipo",
        tipo: "Activo",
        natural: "Debe"
    },

    // ═════════ PASIVOS ═════════

    201: {
        nombre: "Proveedores",
        tipo: "Pasivo",
        natural: "Haber"
    },

    211: {
        nombre: "Alquileres cobrados por anticipado",
        tipo: "Pasivo",
        natural: "Haber"
    },

    221: {
        nombre: "Provision Prestaciones laborales",
        tipo: "Pasivo",
        natural: "Haber"
    },

    // ═════════ CAPITAL ═════════

    301: {
        nombre: "Capital Social",
        tipo: "Capital",
        natural: "Haber"
    },

    391: {
        nombre: "Utilidad del ejercicio",
        tipo: "Capital",
        natural: "Haber"
    },


    // ═════════ INGRESOS ═════════

    401: {
        nombre: "Ventas",
        tipo: "Ingreso",
        natural: "Haber"
    },

    411: {
        nombre: "Devoluciones y rebajas compras",
        tipo: "Ingreso",
        natural: "Haber"
    },

    421: {
        nombre: "Descuento en compras",
        tipo: "Ingreso",
        natural: "Haber"
    },

    431: {
        nombre: "Alquileres cobrados (producto)",
        tipo: "Ingreso",
        natural: "Haber"
    },

    // ═════════ GASTOS ═════════

    501: {
        nombre: "Compras",
        tipo: "Gasto",
        natural: "Debe"
    },

    511: {
        nombre: "Devoluciones y rebajas ventas",
        tipo: "Gasto",
        natural: "Debe"
    },

    521: {
        nombre: "Papeleria y utiles",
        tipo: "Gasto",
        natural: "Debe"
    },

    531: {
        nombre: "Gastos de compra",
        tipo: "Gasto",
        natural: "Debe"
    },

    541: {
        nombre: "Sueldos de Venta",
        tipo: "Gasto",
        natural: "Debe"
    },

    551: {
        nombre: "Sueldos de Administracion",
        tipo: "Gasto",
        natural: "Debe"
    },

    561: {
        nombre: "Cuotas patronales Ventas",
        tipo: "Gasto",
        natural: "Debe"
    },

    571: {
        nombre: "Cuotas patronales Admon",
        tipo: "Gasto",
        natural: "Debe"
    }

};

// Estado global
let CATALOGO = { ...CATALOGO_DEFAULT };