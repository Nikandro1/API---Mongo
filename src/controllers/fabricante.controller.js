const Componente = require('../mongoSchema/componenteSchema')
const Producto = require('../mongoSchema/productoSchema')
const Fabricante = require('../mongoSchema/fabricanteSchema')
const cliente = require('../redis')
const controller = {}

const getAllFabricantes = async(req,res)=>{
    const fabricanteCache = await cliente.get("fabricantes")
    if (fabricanteCache)
        return res.status(200).json(JSON.parse(fabricanteCache))
    const fabricantes = await Fabricante.find({})
    await cliente.set("fabricantes", JSON.stringify(fabricantes), "EX", 5000)
    res.status(200).json(fabricantes)
}

controller.getAllFabricantes = getAllFabricantes


const getFabricanteById = async(req,res)=>{
    const id = req.params.id
    const fabricanteCache = await cliente.get(`fabricante${id}`)
    if (fabricanteCache)
        return res.status(200).json(JSON.parse(fabricanteCache))
    const fabricante = await Fabricante.findById({_id:id}).populate("productos")
    await cliente.set(`fabricante${id}`, JSON.stringify(fabricante), "EX", 5000)
    res.status(200).json(fabricante)
}

controller.getFabricanteById = getFabricanteById

const postFabricante = async(req,res)=>{
    const {nombre, direccion, numeroContacto, pathImgPerfil} = req.body
    const fabricanteNuevo = await Fabricante.create({
        nombre,
        direccion,
        numeroContacto,
        pathImgPerfil
    })
    const fabricantes = await Fabricante.find({})
    await cliente.set("fabricantes", JSON.stringify(fabricantes), "EX", 5000) 
    res.status(201).json(fabricanteNuevo)
}
controller.postFabricante = postFabricante

const deleteFabricanteById = async(req,res)=>{
    const idFabricante = req.params.id
    const r = await Fabricante.findByIdAndDelete({_id: idFabricante })
    await cliente.del(`fabricante${idFabricante}`)
    const fabricantes = await Fabricante.find({})
    await cliente.set("fabricantes", JSON.stringify(fabricantes), "EX", 5000)
    res.status(204).json(r)
}

controller.deleteFabricanteById = deleteFabricanteById

const updateFabricante = async (req, res) => {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
    const id = req.params.id
    const fabricante = await Fabricante.findByIdAndUpdate({_id:id},
        {$set : {nombre, direccion, numeroContacto, pathImgPerfil}}, {new:true}
    )
    await cliente.set(`fabricante${id}`, JSON.stringify(fabricante), "EX", 5000)
    const fabricantes = await Fabricante.find({})
    await cliente.set("fabricantes", JSON.stringify(fabricantes), "EX", 5000)
    res.status(200).json(fabricante)
}
controller.updateFabricante = updateFabricante


//HACE LO MISMO QUE GET BY ID
const getFabricanteAndProductosById = async (req, res) => {
    const id = req.params.id
    const fabricante = await Fabricante.findById(id).populate("productos")
    res.status(200).json(fabricante)
}

controller.getFabricanteAndProductosById = getFabricanteAndProductosById

module.exports = controller