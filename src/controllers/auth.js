import {hash, compare} from 'bcrypt'
import User from "../models/mongoDB/User.js";
import jwt from 'jsonwebtoken'

const saltRounds = 10
export const authController = {
    async registerUser(req, res) { //Registrar usuario
        try{
        const {fullName, email} = req.body
        const password = await hash(req.body.password, saltRounds )
        const newUser = new User({fullName, email, password})
        const response = await newUser.save() 
        res.status(200).json({success:true, message: "Nuevo usuario registrado", data: response})

        }catch(err){
            res.status(500).json({success:false, message: "Error interno del servidor", data: newUser})
        }
    },
    async login(req, res) { //logearse con el el usuario 
        const response = await User.find().where({email: req.body.email})
        if (!response.length){
             res.status(401).json({success: false, message:"El password o el Email son incorrectos"})
        }
           
        const isSamePassword = await compare (req.body.password, response[0].password)
        if (!isSamePassword) {
         res.status(401).json({ success: false, message:"Su password o email es invalido"})
        }
        const userToken = {
            userName: response[0].fullName,
            userEmail: response[0].email,
            sub: response[0].id
        }
        const accessToken = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: '2h'})
        res.status(200).json({ sucess: true, message:"Usuario autorizado", data: accessToken }) //confirmacion y token para usar otras funciones

},

    

 // async generateToken(payload){
    //     const userForToken = {
    //         userName: payload.fullName,
    //         userEmail: payload.email,
    //         sub: payload.id
    //     }
    //     return jwt.sign(userForToken, process.env.JWT_SECRET, { expireIn: '1h'})
    // }
    
}
