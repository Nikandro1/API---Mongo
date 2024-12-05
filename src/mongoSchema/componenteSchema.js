const mongoose = require("../db/mongo.db").mongoose;
const { Schema } = require("mongoose");
const componenteSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true,
        minlength: 3,
        maxlenght: 255
    },
    descripcion: {
        type: Schema.Types.String,
        required: true,
        minlength: 3,
        maxlenght: 255
    }
}
/*{
    collection:"componentes",
}*/)

const Componente = mongoose.model("Componente", componenteSchema)
module.exports = Componente