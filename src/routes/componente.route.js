const {Router} = require('express')
const route = Router()
const componenteController = require('../controllers/componente.controller')
const schemaValidator = require('../middlewares/schemaValidator.middlewares')
const componenteSchema = require('../schemas/componente.schema')
const componenteMiddleware = require('../middlewares/validateID.middlewares')

/**
 * @swagger
 * /componentes:
 *   get:
 *     summary: Obtener todos los componentes
 *     tags: [Componentes]
 *     responses:
 *       200:
 *         description: Lista de componentes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único del componente
 *                   nombre:
 *                     type: string
 *                     description: Nombre del componente
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del componente
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
route.get('/componentes', 
    componenteController.getAllComponentes)

    /**
 * @swagger
 * /componentes/{id}:
 *   get:
 *     summary: Obtener un componente en particular
 *     tags: [Componentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del componente
 *     responses:
 *       200:
 *         description: Componente obtenido correctamente
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
 *       404:
 *         description: Componente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: El id no existe
 */
route.get('/componentes/:id', 
    componenteMiddleware.validarComponenteId, 
    componenteController.getComponenteById)

    /**
 * @swagger
 * /componentes:
 *   post:
 *     summary: Crear un componente
 *     tags: [Componentes]
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
 *         description: Componente creado correctamente
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
 */
route.post('/componentes', 
    schemaValidator(componenteSchema), 
    componenteController.postComponente)

    /**
 * @swagger
 * /componentes/{id}:
 *   put:
 *     summary: Modificar los datos de un componente en particular
 *     tags: [Componentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del componente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del componente
 *               descripcion:
 *                 type: string
 *                 description: Descripción del componente
 *     responses:
 *       200:
 *         description: Datos del componente actualizados correctamente
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
 *       404:
 *         description: Componente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: El id no existe
 */
route.put('/componentes/:id', 
    componenteMiddleware.validarComponenteId, schemaValidator(componenteSchema), componenteController.updateComponente)

    /**
 * @swagger
 * /componentes/{id}:
 *   delete:
 *     summary: Borrar un componente en particular
 *     tags: [Componentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del componente
 *     responses:
 *       200:
 *         description: Componente borrado correctamente
 *       404:
 *         description: Componente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: El id no existe
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error en la solicitud
 */
route.delete('/componentes/:id', 
    componenteMiddleware.validarComponenteId,
    componenteController.deleteComponenteById)

    /**
 * @swagger
 * /componentes/{id}/productos:
 *   get:
 *     summary: Obtener todos los productos de un componente
 *     tags: [Componentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del componente
 *     responses:
 *       200:
 *         description: Lista de productos del componente obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único del producto
 *                   nombre:
 *                     type: string
 *                     description: Nombre del producto
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del producto
 *                   precio:
 *                     type: number
 *                     description: Precio del producto
 *                   pathImg:
 *                     type: string
 *                     description: Path de la imagen del producto
 *       404:
 *         description: Componente no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: El id no existe
 */
route.get('/componentes/:id/productos', 
    componenteMiddleware.validarComponenteId, 
    componenteController.getProductoAndComponentesById)



module.exports = route