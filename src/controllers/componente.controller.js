const Componente = require('../mongoSchema/componenteSchema')
const Producto = require('../mongoSchema/productoSchema')
const Fabricante = require('../mongoSchema/fabricanteSchema')
const cliente = require('../redis')
const controller = {}

const getAllComponentes = async(req,res)=>{
    const componenteCache = await cliente.get("componentes")
    if (componenteCache)
        return res.status(200).json(JSON.parse(componenteCache))
    const componentes = await Componente.find({})
    await cliente.set("componentes", JSON.stringify(componentes), "EX", 5000)
    res.status(200).json(componentes)
}

controller.getAllComponentes = getAllComponentes

const getComponenteById = async(req,res)=>{
    const id = req.params.id
    const componenteCache = await cliente.get(`componente${id}`)
    if (componenteCache)
        return res.status(200).json(JSON.parse(componenteCache))
    const componente = await Componente.findById({_id:id})
    await cliente.set(`componente${id}`, JSON.stringify(componente), "EX", 5000)
    res.status(200).json(componente)
}

controller.getComponenteById = getComponenteById

const postComponente = async(req,res)=>{
    const {nombre, descripcion} = req.body
    const componenteNuevo = await Componente.create({
        nombre,
        descripcion
    })
    const componentes = await Componente.find({})
    await cliente.set("componentes", JSON.stringify(componentes), "EX", 5000)
    res.status(201).json(componenteNuevo)
}
controller.postComponente = postComponente

const deleteComponenteById = async(req,res)=>{
    const idComponente = req.params.id
    const r = await Componente.findByIdAndDelete({_id: idComponente})
    await cliente.del(`componente${idComponente}`)
    const componentes = await Componente.find({})
    await cliente.set("componentes", JSON.stringify(componentes), "EX", 5000)
    res.status(204).json(r)
}


controller.deleteComponenteById = deleteComponenteById

const updateComponente = async (req, res) => {
    const { nombre, descripcion } = req.body
    const id = req.params.id
    const componente = await Componente.findByIdAndUpdate({_id:id},
        {$set : {nombre, descripcion}},{new:true}
    )
    await cliente.set(`componente${id}`, JSON.stringify(componente), "EX", 5000)
    const componentes = await Componente.find({})
    await cliente.set("componentes", JSON.stringify(componentes), "EX", 5000)
    res.status(200).json(componente)
}
controller.updateComponente = updateComponente

//CREO QUE NO VA
const getProductoAndComponentesById = async (req, res) => {
    const id = req.params.id
    const producto = await Producto.findOne({
        componente : {$elemMatch:{_id: id}}
    })
    const componentes = await Componente.find({})
    await cliente.set("componentes", JSON.stringify(componentes), "EX", 5000)
    res.status(200).json(producto)
}

controller.getProductoAndComponentesById = getProductoAndComponentesById

module.exports = controller