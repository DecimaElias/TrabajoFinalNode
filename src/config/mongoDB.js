import { connect } from "mongoose";
console.log(process.env.MONGO_URI)
async function main(){
    await connect(process.env.MONGO_URI)

}
main()
.then(()=> console.log("Mongo comenzo a trabajar"))
.catch(err => console.log (`Fallo la conexion de la base de datos: ${err.message}`))
