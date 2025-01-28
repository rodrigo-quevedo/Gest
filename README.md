 ### Gest (Gestor de inventario)

- [Live demo](https://gest-rodrigo-quevedo.onrender.com/)
- [Source code](https://github.com/rodrigo-quevedo/Gest)

![Gest website icon](https://github.com/rodrigo-quevedo/Gest/blob/master/frontend/src/media/website_icon.png) 

Aplicación web fullstack (stack MERN) pensada para un negocio que quiere tener control sobre su inventario. 

#### <ins>Características</ins>: 
- Lista de productos disponibles
- Carga de compra de productos de los proveedores
- Carga de ventas a los clientes
- Historial de compras y ventas
- Cálculo de gastos, ventas y ganancia neta
- Sugerencias de autocompletado en cada searchbox/input (en base a la información de la cuenta)
- Gráficos estadísticos (finanzas, compras y ventas).

Cuenta con registro y login abierto al público, también ofrece cuentas demo para probar la app sin necesidad de registrarse. 

#### <ins>Aspectos técnicos</ins>:
- **Frontend**: HTML, CSS (sin librerías), CSS Modules, JavaScript, React, creación de componentes reutilizables, UI responsive (versión desktop y versión mobile), fetch a la API backend, variables de entorno en React.
- **Backend**: NodeJS, Express, MongoDB, Mongoose, manejo de cookies, JSON Web Token (JWT), bcrypt (para encriptar contraseñas de los usuarios en la DB), configuración de CORS (sin librerías, solo middleware), manejo de variables de entorno en NodeJS.
- **Database**: Mongo DB.
- **Despliegue**: El frontend y el backend están desplegados en [Render](https://render.com/) . La database está desplegada en [Mongo DB Atlas](https://www.mongodb.com/products/platform/atlas-database) .