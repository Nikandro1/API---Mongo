const { Router } = require('express')
const route = Router()
const productoController = require('../controllers/producto.controller')
const schemaValidator = require('../middlewares/schemaValidator.middlewares')
const productoSchema = require('../schemas/producto.schema')
const fabricanteSchema = require('../schemas/fabricante.schema')
const componenteSchema = require('../schemas/componente.schema')
const productoMiddleware = require('../middlewares/validateID.middlewares')


/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene una lista de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del producto
 *                   nombre:
 *                     type: string
 *                     description: Nombre del producto
 *                   descripcion:
 *                     type: string
 *                     description: Descripcion del producto
 *                   precio:
 *                     type: number
 *                     description: Precio del producto
 *                   pathImg:
 *                     type: string
 *                     description: Path de la imagen del producto  
 */
route.get('/productos',
    productoController.getAllProductos)

/**
* @swagger
* /productos/{id}:
*   get:
*     summary: Obtiene un producto por ID
*     tags: [Productos]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del producto
*     responses:
*       200:
*         description: Producto obtenido correctamente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: string
*                   description: ID del producto
*                 nombre:
*                   type: string
*                   description: Nombre del producto
*                 descripcion:
*                   type: string
*                   description: Descripción del producto
*                 precio:
*                   type: number
*                   description: Precio del producto
*       404:
*         description: Producto no encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: El id no existe
*/

route.get('/productos/:id',
    productoMiddleware.validarProductoId,
    productoController.getProductoById)

/**
* @swagger
* /productos:
*   post:
*     summary: Crea un nuevo producto
*     tags: [Productos]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - nombre
*               - descripcion
*               - precio
*             properties:
*               nombre:
*                 type: string
*                 description: Nombre del producto
*               descripcion:
*                 type: string
*                 description: Descripción del producto
*               precio:
*                 type: number
*                 description: Precio del producto
*     responses:
*       201:
*         description: Producto creado correctamente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   description: ID del producto creado
*                 nombre:
*                   type: string
*                   description: Nombre del producto
*       400:
*         description: Error en la solicitud
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Mensaje de error
*/
route.post('/productos',
    schemaValidator(productoSchema),
    productoController.postProducto)

/**
* @swagger
* /productos/{id}:
*   put:
*     summary: Actualiza un producto existente
*     tags: [Productos]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID del producto a actualizar
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*                 description: Nuevo nombre del producto
*               descripcion:
*                 type: string
*                 description: Nueva descripción del producto
*               precio:
*                 type: number
*                 description: Nuevo precio del producto
*     responses:
*       200:
*         description: Producto actualizado correctamente
*       404:
*         description: Producto no encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: El id no existe
*/
route.put('/productos/:id',
    productoMiddleware.validarProductoId,
    schemaValidator(productoSchema),
    productoController.updateProducto)

/**
* @swagger
* /productos/{id}:
*   delete:
*     summary: Elimina un producto
*     tags: [Productos]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del producto a eliminar
*     responses:
*       200:
*         description: Producto eliminado correctamente
*       404:
*         description: Producto no encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: El id no existe
*       500:
*         description: Producto no encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: No se puede ejecutar la solicitud
*/
route.delete('/productos/:id',
    productoMiddleware.validarProductoId,
    productoController.deleteProductoById)

/**
* @swagger
* /productos/{id}/fabricantes:
*   get:
*     summary: Obtiene el producto junto con su fabricante
*     tags: [Productos]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: ID del producto
*     responses:
*       200:
*         description: Producto y fabricante obtenidos correctamente
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: string
*                   description: ID del producto
*                 nombre:
*                   type: string
*                   description: Nombre del producto
*                 descripcion:
*                   type: string
*                   description: Descripción del producto
*                 precio:
*                   type: number
*                   description: Precio del producto
*                 fabricante:
*                   type: object
*                   properties:
*                     id:
*                       type: integer
*                       description: ID del fabricante
*                     nombre:
*                       type: string
*                       description: Nombre del fabricante
*                     pais:
*                       type: string
*                       description: País de origen del fabricante
*       404:
*         description: Producto no encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: El id no existe
*/
route.get('/productos/:id/fabricantes',
    productoMiddleware.validarProductoId,
    productoController.getProductoAndFabricantesById)

/**
* @swagger
* /productos/{id}/fabricantes:
*   post:
*     summary: Añade un fabricante a un producto específico
*     tags: [Fabricantes]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ID del producto
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - nombre
*               - direccion
*               - numeroContacto
*               - pathImgPerfil
*             properties:
*               nombre:
*                 type: string
*                 description: Nombre del fabricante
*               direccion:
*                 type: string
*                 description: Dirección del fabricante
*               numeroContacto:
*                 type: string
*                 description: Número de contacto del fabricante
*               pathImgPerfil:
*                 type: string
*                 description: URL de la imagen del perfil del fabricante
*     responses:
*       201:
*         description: Fabricante agregado correctamente al producto
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 _id:
*                   type: string
*                   description: ID único del fabricante
*                 nombre:
*                   type: string
*                   description: Nombre del fabricante
*                 direccion:
*                   type: string
*                   description: Dirección del fabricante
*                 numeroContacto:
*                   type: string
*                   description: Número de contacto del fabricante
*                 pathImgPerfil:
*                   type: string
*                   description: URL de la imagen del perfil del fabricante
*                 productos:
*                   type: array
*                   items:
*                     type: string
*                   description: Lista de IDs de productos asociados al fabricante
*                 __v:
*                   type: integer
*                   description: Versión del fabricante (por defecto 0)
*       400:
*         description: Error en los datos enviados
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: Error en los datos enviados
*       404:
*         description: Producto no encontrado
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   description: El id no existe
*/
route.post('/productos/:id/fabricantes',
    productoMiddleware.validarProductoId,
    schemaValidator(fabricanteSchema),
    productoController.addFabricanteToProducto)

/*SACAR YA FIGURA EN PRODUCTOS ID DIRECTAMENTE - LE PUSE LA RUTE QUE TRAE EL PRODUCTO POR ID*/
route.get('/productos/:id/componentes',
    productoMiddleware.validarProductoId,
    productoController.getProductoById)


/**
 * @swagger
 * /productos/{id}/componentes:
 *   post:
 *     summary: Añade un componente a un producto específico
 *     tags: [Componentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string  // Cambiado a string para reflejar un ObjectId de MongoDB
 *         description: ID del producto (generado por Mongoose)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del componente
 *               descripcion:
 *                 type: string
 *                 description: Descripción del componente
 *     responses:
 *       201:
 *         description: Componente agregado correctamente al producto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del componente
 *                 nombre:
 *                   type: string
 *                   description: Nombre del componente
 *                 descripcion:
 *                   type: string
 *                   description: Descripción del componente
 *                 producto:
 *                   type: string
 *                   description: ID del producto asociado a este componente (ObjectId)
 *                 __v:
 *                   type: integer
 *                   description: Versión del componente (por defecto 0)
 *       400:
 *         description: Error en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */

route.post('/productos/:id/componentes',
    productoMiddleware.validarProductoId,
    schemaValidator(componenteSchema),
    productoController.addComponenteToProducto
)


module.exports = route