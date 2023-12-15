import app from './app.js'
import {connectDB} from './db.js'

connectDB();
app.listen(process.env.PORT || 4000)
console.log("Se está escuchando por el puerto", 4000)