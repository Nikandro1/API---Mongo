const Componente = require('../mongoSchema/componenteSchema')
const Producto = require('../mongoSchema/productoSchema')
const Fabricante = require('../mongoSchema/fabricanteSchema')
const mongoose = require("../db/mongo.db").mongoose;
const { $_match } = require('../schemas/producto.schema')
const cliente = require('../redis')
const controller = {}


const getAllProductos = async (req, res) => {
    const productosCache = await cliente.get("productos")
    if (productosCache)
        return res.status(200).json(JSON.parse(productosCache))
    const productos = await Producto.find({})
    await cliente.set("productos", JSON.stringify(productos), "EX", 5000)
    res.status(200).json(productos)
}

controller.getAllProductos = getAllProductos


const getProductoById = async (req, res) => {
    const idProducto = req.params.id
    const productoCacheId = await cliente.get(`producto${idProducto}`)
    if(productoCacheId)
        return res.status(200).json(JSON.parse(productoCacheId))
    const idProd = idProducto.toString()
    const producto = await Producto.find({ _id: idProd })
    await cliente.set(`producto${idProducto}`, JSON.stringify(producto), "EX", 5000)
    res.status(200).json(producto)
}

controller.getProductoById = getProductoById


const getProductoAndFabricantesById = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const producto = await Producto.aggregate([{
        $match: { _id: id }
    },
    {
        $lookup: {
            from: "fabricantes",
            localField: "_id",
            foreignField: "productos",
            as: "fabricante"
        }
    },
    {
        $project: {
            _id: 1,
            nombre: 1,
            descripcion: 1,
            precio: 1,
            "fabricante._id":1,
            "fabricante.nombre": 1,
            "fabricante.direccion": 1,
            "fabricante.numeroContacto": 1,
        }
    }])
    res.status(200).json(producto)
}

controller.getProductoAndFabricantesById = getProductoAndFabricantesById



const postProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg } = req.body
    const productoNuevo = await Producto.create({
        nombre,
        descripcion,
        precio,
        pathImg
    })
    const productos = await Producto.find({})
    await cliente.set("productos", JSON.stringify(productos), "EX", 5000)
    res.status(201).json(productoNuevo)
}
controller.postProducto = postProducto


const updateProducto = async (req, res) => {
    const { nombre, descripcion, precio, pathImg } = req.body
    const id = req.params.id
    const producto = await Producto.findByIdAndUpdate({ _id: id }, {
        $set: { nombre, descripcion, precio, pathImg }
    }, { new: true })
    await cliente.set(`producto${id}`, JSON.stringify(producto), "EX", 5000)
    const productos = await Producto.find({})
    await cliente.set("productos", JSON.stringify(productos), "EX", 5000)
    res.status(200).json(producto)
}
controller.updateProducto = updateProducto

const deleteProductoById = async (req, res) => {
    const idProducto = req.params.id
    await Fabricante.updateMany(
        {productos: idProducto},
        { $pull : {productos: idProducto}}
    )
    const r = await Producto.findByIdAndDelete({ _id: idProducto })
    await cliente.del(`producto${idProducto}`)
    const productos = await Producto.find({})
    await cliente.set("productos", JSON.stringify(productos), "EX", 5000)
    res.status(204).json({ mensaje: `filas afectados ${r}` })
}
//consultar si cuando lo borro al producto del fabricante tambien deberia actualizar el cache del fabricante
//seguramente si, pero si como un set del fabriante actualizado
controller.deleteProductoById = deleteProductoById


const addFabricanteToProducto = async (req, res) => {
    const idProducto = req.params.id
    const nuevoFabricante = { ...req.body, productos: new mongoose.Types.ObjectId(idProducto) }
    const fabricante = await Fabricante.create(nuevoFabricante)
    
    res.status(201).json(fabricante)
}

controller.addFabricanteToProducto = addFabricanteToProducto


const addComponenteToProducto = async (req, res) => {
    const idProducto = req.params.id
    const producto = await Producto.findByIdAndUpdate(
        idProducto,
        { $push: { componente: req.body } },
        { new: true }
    )
    await cliente.set(`producto${idProducto}`, JSON.stringify(producto), "EX", 5000)
    const productos = await Producto.find({})
    await cliente.set("productos", JSON.stringify(productos), "EX", 5000)
    res.status(201).json(producto)
}

controller.addComponenteToProducto = addComponenteToProducto


module.exports = controller