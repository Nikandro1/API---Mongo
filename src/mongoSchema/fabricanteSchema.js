const mongoose = require("../db/mongo.db").mongoose;
const { Schema } = require("mongoose");
const fabricanteSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true,
        minlength: 3,
        maxlenght: 255
    },
    direccion: {
        type: Schema.Types.String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    numeroContacto: {
        type: Schema.Types.Number,
        required: true,
        minlength: 7,
        maxlength: 20
    },
    pathImgPerfil: {
        type: Schema.Types.String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        //required: true,
    }]
})

const Fabricante = mongoose.model("Fabricante", fabricanteSchema)
module.exports = Fabricante