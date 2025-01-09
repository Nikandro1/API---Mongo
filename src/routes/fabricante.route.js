const {Router} = require('express')
const route = Router()
const fabricanteController = require('../controllers/fabricante.controller')
const schemaValidator = require('../middlewares/schemaValidator.middlewares')
const fabricanteSchema = require('../schemas/fabricante.schema')
const fabricanteMiddleware = require('../middlewares/validateID.middlewares')

/**
 * @swagger
 * /fabricantes:
 *   get:
 *     summary: Obtener todos los fabricantes
 *     tags: [Fabricantes]
 *     responses:
 *       200:
 *         description: Lista de fabricantes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único del fabricante
 *                   nombre:
 *                     type: string
 *                     description: Nombre del fabricante
 *                   direccion:
 *                     type: string
 *                     description: Dirección del fabricante
 *                   numeroContacto:
 *                     type: integer
 *                     description: Número de contacto del fabricante
 *                   pathImgPerfil:
 *                     type: string
 *                     description: URL de la imagen del perfil del fabricante
 */
route.get('/fabricantes', 
    fabricanteController.getAllFabricantes)

    /**
 * @swagger
 * /fabricantes/{id}:
 *   get:
 *     summary: Obtener un fabricante en particular
 *     tags: [Fabricantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del fabricante
 *     responses:
 *       200:
 *         description: Fabricante obtenido correctamente
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
 *                   type: integer
 *                   description: Número de contacto del fabricante
 *                 pathImgPerfil:
 *                   type: string
 *                   description: URL de la imagen del perfil del fabricante
 *       404:
 *         description: Fabricante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: El id no existe
 */
route.get('/fabricantes/:id', 
    fabricanteMiddleware.validarFabricanteId, 
    fabricanteController.getFabricanteById)

    /**
 * @swagger
 * /fabricantes:
 *   post:
 *     summary: Crear un fabricante
 *     tags: [Fabricantes]
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
 *                 type: integer
 *                 description: Número de contacto del fabricante
 *               pathImgPerfil:
 *                 type: string
 *                 description: URL de la imagen del perfil del fabricante
 *     responses:
 *       201:
 *         description: Fabricante creado correctamente
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
 *                   type: integer
 *                   description: Número de contacto del fabricante
 *                 pathImgPerfil:
 *                   type: string
 *                   description: URL de la imagen del perfil del fabricante
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
route.post('/fabricantes', 
    schemaValidator(fabricanteSchema), 
    fabricanteController.postFabricante)

    /**
 * @swagger
 * /fabricantes/{id}:
 *   put:
 *     summary: Modificar los datos de un fabricante en particular
 *     tags: [Fabricantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del fabricante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del fabricante
 *               direccion:
 *                 type: string
 *                 description: Dirección del fabricante
 *               numeroContacto:
 *                 type: integer
 *                 description: Número de contacto del fabricante
 *               pathImgPerfil:
 *                 type: string
 *                 description: URL de la imagen del perfil del fabricante
 *     responses:
 *       200:
 *         description: Datos del fabricante actualizados correctamente
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
 *                   type: integer
 *                   description: Número de contacto del fabricante
 *                 pathImgPerfil:
 *                   type: string
 *                   description: URL de la imagen del perfil del fabricante
 *       404:
 *         description: Fabricante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: El id no existe
 */
route.put('/fabricantes/:id', 
    fabricanteMiddleware.validarFabricanteId,
    schemaValidator(fabricanteSchema), 
    fabricanteController.updateFabricante)

    /**
 * @swagger
 * /fabricantes/{id}:
 *   delete:
 *     summary: Borrar un fabricante en particular
 *     tags: [Fabricantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del fabricante
 *     responses:
 *       200:
 *         description: Fabricante borrado correctamente
 *       404:
 *         description: Fabricante no encontrado
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
 *                   description: Erro en la solicitud
 */
route.delete('/fabricantes/:id', 
    fabricanteMiddleware.validarFabricanteId,
    fabricanteController.deleteFabricanteById)

/**
 * @swagger
 * /fabricantes/{id}/productos:
 *   get:
 *     summary: Obtener todos los productos de un fabricante
 *     tags: [Fabricantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del fabricante
 *     responses:
 *       200:
 *         description: Lista de productos del fabricante obtenida correctamente
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
 *         description: Fabricante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
route.get('/fabricantes/:id/productos', 
    fabricanteMiddleware.validarFabricanteId,
    fabricanteController.getFabricanteAndProductosById)
/*Devuelve lo mismo que el primero pero como lo tenia hecho de antes lo dejé*/
module.exports = route