const Componente = require('../mongoSchema/componenteSchema')
const Producto = require('../mongoSchema/productoSchema')
const Fabricante = require('../mongoSchema/fabricanteSchema')
const middleware = {};

const validarId = (modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const instancia = await modelo.find({id});
        if (!instancia) {
            return res.status(404).json({ message: `El ${id} no existe` });
        }
        next();
    };
};

middleware.validarProductoId = validarId(Producto)
middleware.validarComponenteId = validarId(Componente);
middleware.validarFabricanteId = validarId(Fabricante);

module.exports = middleware