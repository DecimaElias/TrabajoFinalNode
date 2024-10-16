import {mongoose} from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        fullName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
    
    },
    {timestamps:true}
)

UserSchema.set("toJSON", {
    Transform(_doc, ret) {
        delete ret.password
    }
})

const User = mongoose.model("usuarios", UserSchema)
export default User