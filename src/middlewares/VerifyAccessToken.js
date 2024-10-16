import jwt from "jsonwebtoken"
export const verifyAccessToken = (req, res, next) => {
const authHeader = req.headers.authorization
if (authHeader) {
    const token = authHeader.split(" ") [1]
    jwt.verify (token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({success: false, message: "El token que ingresó es incorrecto o esta caducado"})
        req.decoded = decoded 
        next()
    })
} else 
    res.status(401).json({success: false, message: "No ingresó token de acceso"})

}
