const mongoose = require("../db/mongo.db").mongoose;
const { Schema } = require("mongoose");
const Fabricante = require("./fabricanteSchema");
const productoSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    descripcion: {
        type: Schema.Types.String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    precio: {
        type: Schema.Types.Number,
        required: true
    },
    pathImg: {
        type: Schema.Types.String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    componente: [
        {
            nombre: { type: String, required: true, minlength: 3, maxlength: 255 },
            descripcion: { type: String, required: true, minlength: 3, maxlenght: 255 }
        }
    ]
}
/*{
    collection:"productos",
}*/)

const Producto = mongoose.model("Producto", productoSchema)
module.exports = Producto