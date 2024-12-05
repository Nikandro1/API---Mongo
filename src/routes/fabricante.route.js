const {Router} = require('express')
const route = Router()
const fabricanteController = require('../controllers/fabricante.controller')
const schemaValidator = require('../middlewares/schemaValidator.middlewares')
const fabricanteSchema = require('../schemas/fabricante.schema')
const fabricanteMiddleware = require('../middlewares/validateID.middlewares')

route.get('/fabricantes', 
    fabricanteController.getAllFabricantes)

route.get('/fabricantes/:id', 
    fabricanteMiddleware.validarFabricanteId, 
    fabricanteController.getFabricanteById)

route.post('/fabricantes', 
    schemaValidator(fabricanteSchema), 
    fabricanteController.postFabricante)

route.put('/fabricantes/:id', 
    fabricanteMiddleware.validarFabricanteId,
    schemaValidator(fabricanteSchema), 
    fabricanteController.updateFabricante)

route.delete('/fabricantes/:id', 
    fabricanteMiddleware.validarFabricanteId,
    fabricanteController.deleteFabricanteById)
/*SACAR?*/
route.get('/fabricantes/:id/productos', 
    fabricanteMiddleware.validarFabricanteId,
    fabricanteController.getFabricanteAndProductosById)

module.exports = route