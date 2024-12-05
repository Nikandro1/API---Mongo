## Descripción del Proyecto

Se creo una API con Mongo DB en donde se utiliza relación incrustada y referenciada. Además de contar con las validación necesarías con middlewares y schemas. También cuenta con memoría caché con Redis.

# Enfoques de relaciones en MongoDB

Las relaciones en MongoDB se pueden modelar en 2 enfoques diferentes: la relación incrustada o relación referenciada. La elección de estos enfoques dependerá del tipo de casuística a abordar y decisiones de modelamiento de datos.


- API REST:
  Una API REST (Representational State Transfer) es un conjunto de reglas y convenciones para la creación de servicios web que permiten la comunicación entre sistemas. En este trabajo práctico, utilizaremos una API REST para exponer recursos y permitir operaciones CRUD (Create, Read, Update, Delete) sobre estos recursos.



### Descripción del modelo DER

- Un **Producto** puede tener muchos fabricantes, y un **Fabricante** puede fabricar muchos productos.
- Un **Producto** puede tener muchos componentes, y un **Componente** puede formar parte de varios productos.

### Base de datos

El motor de base de datos es **Mongo DB**. Se utiliza el archivo docker compose incluido en este proyecto para que puedan instanciar el motor de base de datos y un cliente del mismo para consultar las colecciones de forma dockerizada y la memoría caché.



## API

Implementar la API utilizando el framework express en el entorde de ejecucion de un poryecto NodeJs. Organizar el código en rutas, controlers y middleware utilizando la separación por recurso. A continuación se detallan los endpoinds que deberán estar disponbiles en la API.

| Verbo  | Recurso                    | Status code   | Descripción                                           |
| ------ | -------------------------- | ------------- | ----------------------------------------------------- |
| GET    | /productos                 | 200           | Obtener todos los productos                           |
| GET    | /productos/:id             | 200, 404      | Obtener un producto en particular                     |
| POST   | /productos                 | 201, 400      | Crear un producto                                     |
| PUT    | /productos/:id             | 200, 404      | Modificar los datos de un producto en particular      |
| DELETE | /productos/:id             | 200, 404, 500 | Borrar un producto en particular                      |
| POST   | /productos/:id/fabricantes | 201, 404, 400 | Crear la asociación de producto con 1 o N fabricantes |
| GET    | /productos/:id/fabricantes | 200, 404      | Obtener todos los fabricantes de un producto          |
| POST   | /productos/:id/componentes | 201, 404, 400 | Crear la asociación de producto con 1 o N componentes |
| GET    | /productos/:id/componentes | 200, 404      | Obtener todos los componentes de un producto          |
| GET    | /fabricantes               | 200           | Obtener todos los fabricantes                         |
| GET    | /fabricantes/:id           | 200, 404      | Obtener un fabricante en particular                   |
| POST   | /fabricantes               | 201, 400      | Crear un fabricante                                   |
| PUT    | /fabricantes/:id           | 200, 404      | Modificar los datos de un fabricante en particular    |
| DELETE | /fabricantes/:id           | 200, 404, 500 | Borrar un fabricante en particular                    |
| GET    | /fabricantes/:id/productos | 200, 404      | Obtener todos los productos de un fabricante          |
| GET    | /componentes               | 200           | Obtener todos los componentes                         |
| GET    | /componentes/:id           | 200, 404      | Obtener un componente en particular                   |
| POST   | /componentes               | 201, 400      | Crear un componente                                   |
| PUT    | /componentes/:id           | 200, 404      | Modificar los datos de un componente en particular    |
| DELETE | /componentes/:id           | 200, 404, 500 | Borrar un componente en particular                    |
| GET    | /componentes/:id/productos | 200, 404      | Obtener todos los productos de un componente          |

