import {mongoose} from 'mongoose'
const Schema = mongoose.Schema
const MovieSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    año: {
        type:Number,
        required: [true, "El año es obligatorio"],
        min: [1810, "no puede ser antes de 1810"],
        max: [2024, "no puede ser superior a 2025"]
    },
    actor: {
        type: String,
        required: true,
        trim: true


    },
    genero: {
        type: [String],
        required: true

    },
},
{
   timestamps:true 
})
MovieSchema.index({title: "text"})

const Movie = mongoose.model("peliculas", MovieSchema)
export default Movie