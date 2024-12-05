const arrVentasSuper = 
[
    {"producto": "arroz 1kg", "cantidad": 2, "precio_unitario": 3665.50, "marca": "las delicias", "proveedor": "ALIMENTOS DEL SUR", "fechaHora": `${new Date("2024-04-18 09:20")}`},
    {"producto": "leche 1L", "cantidad": 2, "precio_unitario": 6222.38, "marca": "sancor", "proveedor": "LACTEOS DEL VALLE", "fechaHora": `${new Date("2024-04-18 09:25")}`},
    {"producto": "jabón en barra 250g", "cantidad": 3, "precio_unitario": 1910.43, "marca": "acuar  ", "proveedor": "PRODUCTOS DE HIGIENE", "fechaHora": `${new Date("2024-04-18 09:30")}`},
    {"producto": "detergente líquido 1L", "cantidad": 2, "precio_unitario": 8117.60, "marca": "limpimax", "proveedor": "HIGIENICOL S.A.", "fechaHora": `${new Date("2024-04-18 09:35")}`},
    {"producto": "papel higiénico 4 rollos", "cantidad": 2, "precio_unitario": 3777.60, "marca": "hygienic", "proveedor": "PAPELERÍA EL ARCO", "fechaHora": `${new Date("2024-04-18 09:40")}`},
    {"producto": "fideos 500g", "cantidad": 3, "precio_unitario": 3943.57, "marca": "la italiana", "proveedor": "PASTAS EL MUNDO", "fechaHora": `${new Date("2024-04-18 09:45")}`},
    {"producto": "taza de cerámica", "cantidad": 1, "precio_unitario": 5223.00, "marca": "ceramica premium", "proveedor": "ARTÍCULOS DEL HOGAR", "fechaHora": `${new Date("2024-04-18 09:50")}`},
    {"producto": "pan de molde 500g", "cantidad": 2, "precio_unitario": 2777.60, "marca": "panadería del sur", "proveedor": "PANADERÍA DEL SOL", "fechaHora": `${new Date("2024-04-18 10:30")}`},
    {"producto": "aceite 1L", "cantidad": 2, "precio_unitario": 6772.22, "marca": "cocinero", "proveedor": "ACEITES DEL SUR", "fechaHora": `${new Date("2024-04-18 10:40")}`},
    {"producto": "sal fina 1kg", "cantidad": 2, "precio_unitario": 2111.11, "marca": "salvimar", "proveedor": "SAL Y CONDIMENTOS S.A.", "fechaHora": `${new Date("2024-04-18 11:45")}`},
    {"producto": "champú 400ml", "cantidad": 2, "precio_unitario": 5444.44, "marca": "sedal ", "proveedor": "COSMÉTICOS DEL NORTE", "fechaHora": `${new Date("2024-04-18 11:50")}`},
    {"producto": "pasta dental 150g", "cantidad": 3, "precio_unitario": 3666.50, "marca": "colgate", "proveedor": "PRODUCTOS DE HIGIENE DIARIA", "fechaHora": `${new Date("2024-05-19 09:30")}`},
    {"producto": "desodorante 150ml", "cantidad": 2, "precio_unitario": 5774.44, "marca": "axe    ", "proveedor": "COSMÉTICOS Y PERFUMERÍA", "fechaHora": `${new Date("2024-05-19 15:20")}`},
    {"producto": "aceituna 200g", "cantidad": 2, "precio_unitario": 3163.89, "marca": "aceitunas del sur", "proveedor": "ALIMENTOS Y CONDIMENTOS", "fechaHora": `${new Date("2024-05-19 19:15")}`},
    {"producto": "silla plástica", "cantidad": 1, "precio_unitario": 7555.56, "marca": "plastiart", "proveedor": "MUEBLES DEL HOGAR", "fechaHora": `${new Date("2024-04-18 09:20")}`},
    {"producto": "gaseosa coca cola 2L", "cantidad": 2, "precio_unitario": 5111.11, "marca": "coca cola", "proveedor": "BEVERAGES S.A.", "fechaHora": `${new Date("2024-04-30 13:25")}`},
    {"producto": "vino tinto 750ml", "cantidad": 1, "precio_unitario": 10235.55, "marca": "el buen vino", "proveedor": "VINOS Y LICORES DEL OESTE", "fechaHora": `${new Date("2024-05-01 09:50")}`},
    {"producto": "gaseosa fanta 1.5L", "cantidad": 2, "precio_unitario": 4666.66, "marca": "fanta  ", "proveedor": "BEVERAGES WORLD", "fechaHora": `${new Date("2024-05-02 10:00")}`},
    {"producto": "arroz 1kg", "cantidad": 4, "precio_unitario": 3665.50, "marca": "las delicias", "proveedor": "ALIMENTOS DEL SUR", "fechaHora": `${new Date("2024-04-19 09:20")}`},
    {"producto": "leche 1L", "cantidad": 4, "precio_unitario": 6222.38, "marca": "sancor", "proveedor": "LACTEOS DEL VALLE", "fechaHora": `${new Date("2024-04-19 09:25")}`},
    {"producto": "jabón en barra 250g", "cantidad": 6, "precio_unitario": 1910.43, "marca": "acuar ", "proveedor": "PRODUCTOS DE HIGIENE", "fechaHora": `${new Date("2024-04-19 09:30")}`},
    {"producto": "detergente líquido 1L", "cantidad": 4, "precio_unitario": 6117.60, "marca": "limpimax", "proveedor": "HIGIENICOL S.A.", "fechaHora": `${new Date("2024-04-19 09:35")}`},
    {"producto": "papel higiénico 4 rollos", "cantidad": 4, "precio_unitario": 2777.60, "marca": "hygienic", "proveedor": "PAPELERÍA EL ARCO", "fechaHora": `${new Date("2024-04-19 09:40")}`},
    {"producto": "fideos 500g", "cantidad": 6, "precio_unitario": 2943.57, "marca": "la italiana", "proveedor": "PASTAS EL MUNDO", "fechaHora": `${new Date("2024-04-19 09:45")}`},
    {"producto": "taza de cerámica", "cantidad": 2, "precio_unitario": 3223.00, "marca": "ceramica premium", "proveedor": "ARTÍCULOS DEL HOGAR", "fechaHora": `${new Date("2024-04-19 09:50")}`},
    {"producto": "pan de molde 500g", "cantidad": 4, "precio_unitario": 2777.60, "marca": "panadería del sur", "proveedor": "PANADERÍA DEL SOL", "fechaHora": `${new Date("2024-04-19 10:30")}`},
    {"producto": "aceite 1L", "cantidad": 4, "precio_unitario": 5772.22, "marca": "cocinero", "proveedor": "ACEITES DEL SUR", "fechaHora": `${new Date("2024-04-19 10:40")}`},
    {"producto": "sal fina 1kg", "cantidad": 4, "precio_unitario": 2111.11, "marca": "salvimar", "proveedor": "SAL Y CONDIMENTOS S.A.", "fechaHora": `${new Date("2024-04-19 11:45")}`},
    {"producto": "champú 400ml", "cantidad": 4, "precio_unitario": 3444.44, "marca": "sedal ", "proveedor": "COSMÉTICOS DEL NORTE", "fechaHora": `${new Date("2024-04-19 11:50")}`},
    {"producto": "pasta dental 150g", "cantidad": 6, "precio_unitario": 2666.50, "marca": "colgate", "proveedor": "PRODUCTOS DE HIGIENE DIARIA", "fechaHora": `${new Date("2024-05-20 09:30")}`},
    {"producto": "desodorante 150ml", "cantidad": 4, "precio_unitario": 4774.44, "marca": "axe   ", "proveedor": "COSMÉTICOS Y PERFUMERÍA", "fechaHora": `${new Date("2024-05-20 15:20")}`},
    {"producto": "aceituna 200g", "cantidad": 6, "precio_unitario": 4163.89, "marca": "aceitunas del sur", "proveedor": "ALIMENTOS Y CONDIMENTOS", "fechaHora": `${new Date("2024-05-20 19:15")}`},
    {"producto": "silla plástica", "cantidad": 1, "precio_unitario": 7555.56, "marca": "plastiart", "proveedor": "MUEBLES DEL HOGAR", "fechaHora": `${new Date("2024-04-19 09:20")}`},
    {"producto": "gaseosa coca cola 2L", "cantidad": 4, "precio_unitario": 5111.11, "marca": "coca cola", "proveedor": "BEVERAGES S.A.", "fechaHora": `${new Date("2024-05-01 13:25")}`},
    {"producto": "vino tinto 750ml", "cantidad": 1, "precio_unitario": 10235.55, "marca": "el buen vino", "proveedor": "VINOS Y LICORES DEL OESTE", "fechaHora": `${new Date("2024-05-02 09:50")}`},
    {"producto": "gaseosa fanta 1.5L", "cantidad": 4, "precio_unitario": 3666.66, "marca": "fanta ", "proveedor": "BEVERAGES WORLD", "fechaHora": `${new Date("2024-05-03 10:00")}`}
  ]

  module.exports = arrVentasSuper