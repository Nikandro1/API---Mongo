const {Router} = require('express')
const route = Router()
const productoController = require('../controllers/producto.controller')
const schemaValidator = require('../middlewares/schemaValidator.middlewares')
const productoSchema = require('../schemas/producto.schema')
const fabricanteSchema = require('../schemas/fabricante.schema')
const componenteSchema = require('../schemas/componente.schema')
const productoMiddleware = require('../middlewares/validateID.middlewares')

route.get('/productos',
    productoController.getAllProductos)

route.get('/productos/:id',
    productoMiddleware.validarProductoId,
    productoController.getProductoById)

route.post('/productos',
    schemaValidator(productoSchema), 
    productoController.postProducto)

route.put('/productos/:id', 
    productoMiddleware.validarProductoId, 
    schemaValidator(productoSchema), 
    productoController.updateProducto)

route.delete('/productos/:id', 
    productoMiddleware.validarProductoId,
    productoController.deleteProductoById)

route.get('/productos/:id/fabricantes',
    productoMiddleware.validarProductoId,
    productoController.getProductoAndFabricantesById)

route.post('/productos/:id/fabricantes', 
    productoMiddleware.validarProductoId,
    schemaValidator(fabricanteSchema),
    productoController.addFabricanteToProducto)

    /*SACAR YA FIGURA EN PRODUCTOS ID DIRECTAMENTE - LE PUSE LA RUTE QUE TRAE EL PRODUCTO POR ID*/ 
route.get('/productos/:id/componentes',
    productoMiddleware.validarProductoId,
    productoController.getProductoById)

route.post('/productos/:id/componentes', 
    productoMiddleware.validarProductoId,
    schemaValidator(componenteSchema),
    productoController.addComponenteToProducto 
    )


module.exports = route