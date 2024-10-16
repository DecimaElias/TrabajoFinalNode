import Movie from "../models/mongoDB/Movie.js"
export const movieController = {
    
    //Para mostrar todas las peliculas
    async getAll(req, res){
        try {

        
        const movies = await Movie.find()
        movies.length ?
            res.status(200).json ({success: true, message: "Coleccion de peliculas", data: movies })
            :
            res.status(404).json ({success: false, message: "Coleccion de peliculas", data: movies })
        
        } catch (error) {
            res.status(500).json ({success: false, message: "Error de aplicación" })

        }
    },

    //Para buscar por titulo
    async getByTitle(req, res) {
        const {nombre} = req.query
        if (!nombre) {
            res.status(400).json({success: false, message: "No ingresó ningún titúlo"})
        }
        try {
            const movies = await Movie.find({ nombre: { $regex: nombre, $options: "i"}})
            if(!movies.length){
                return res.status(404).json({success: false, message: `No se encontro '${nombre}' en el titulo de la pelicula` })
            }
             res.status(200).json({ success: true, message: "Se encontraron las siguientes peliculas", data: movies})
            
        } catch (error) {
            res.status(500).json({sucess: false, message: "Error en el servidor"})
        }
    },

    //Para buscar por id
    async getById(req, res) {
        const {id} = req.params
        if (!id) {
            res.status(400).json({success: false, message: "ingrese un ID"})
        }
        try {
            const movie = await Movie.findById(id);
            if (!movie) {
                return res.status(404).json({ success: false, message: `No se encontró una película con ID '${id}'` });
            }
            res.status(200).json({ success: true, message: "Película encontrada", data: movie });
            
        } catch (error) {
            res.status(500).json({ success: false, message: "Error en el servidor" });
        }
    },


    //Para crear pelicula
    async createOne(req, res){
        const {nombre, año, actor, genero} = req.body
        try {
            const newMovie = new Movie({
                nombre, año, actor, genero
            })
            const savedMovie = await newMovie.save()
            res.status(200).json ({success: true, message: "Nueva pelicula creada", data: savedMovie })

        } catch (error) {
            res.status(500).json({sucess: false, message: "Error fatal"})
        }
    },

    //Para modificar pelicula

    async updateOne(req, res){
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
            if(!updatedMovie){
                return res.status(404).json({success:false, message: "no funciona"})
            }
            res.status(200).json({success: true, message: "Pelicula modificada", data: updatedMovie})
        } catch (error){
            res.status(500).json ({success: false, message: "Internal Error"})
    }
},

    //Para borrar pelicula
    async deleteOne(req, res) {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id)
            if (!movie) {
            return res.status(404).json({success: false, message: "No se puede borrar la pelicula"})
            }
            res.status(200).json({success: true, message: "Pelicula eliminada", data: movie}) //si bien se que se recomienda status (204) le puse (200) para poder ver el msj de confirmación
        } catch (error) {
            res.status(500).json ({success: false, message: "Error de servidor"})
    }

}
}