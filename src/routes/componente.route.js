const {Router} = require('express')
const route = Router()
const componenteController = require('../controllers/componente.controller')
const schemaValidator = require('../middlewares/schemaValidator.middlewares')
const componenteSchema = require('../schemas/componente.schema')
const componenteMiddleware = require('../middlewares/validateID.middlewares')

route.get('/componentes', 
    componenteController.getAllComponentes)

route.get('/componentes/:id', 
    componenteMiddleware.validarComponenteId, 
    componenteController.getComponenteById)

route.post('/componentes', 
    schemaValidator(componenteSchema), 
    componenteController.postComponente)

route.put('/componentes/:id', 
    componenteMiddleware.validarComponenteId, schemaValidator(componenteSchema), componenteController.updateComponente)

route.delete('/componentes/:id', 
    componenteMiddleware.validarComponenteId,
    componenteController.deleteComponenteById)

route.get('/componentes/:id/productos', 
    componenteMiddleware.validarComponenteId, 
    componenteController.getProductoAndComponentesById)



module.exports = route