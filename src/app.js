const express = require("express")
const dbCon = require("./db/mongo.db").connectToDatabase
const mongoose = require("./db/mongo.db").mongoose
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
const PORT = process.env.PORT ?? 3001
const rutas = require('./routes')

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(rutas.productoRutas)
app.use(rutas.fabricanteRutas)
app.use(rutas.componenteRutas)

app.listen(PORT, async()=>{
    await dbCon()
    console.log(`Aplicacion levantada en el puerto ${PORT}`)
    console.log('Documentación en http://localhost:3001/api-docs');
})