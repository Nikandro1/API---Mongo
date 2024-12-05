const express = require("express")
const dbCon = require("./db/mongo.db").connectToDatabase
const mongoose = require("./db/mongo.db").mongoose
const app = express()
const PORT = process.env.PORT ?? 3001
const rutas = require('./routes')

app.use(express.json())
app.use(rutas.productoRutas)
app.use(rutas.fabricanteRutas)
app.use(rutas.componenteRutas)

app.listen(PORT, async()=>{
    await dbCon()
    console.log(`Aplicacion levantada en el puerto ${PORT}`)
})