import mongoose from "mongoose";
import generateID from "../helpers/generateID.js";
import bcrypt from 'bcrypt';


const vetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phone: {
        type: String,
        default: null,
        trim: true,
    },
    web: {
        type: String,
        default: null,
    },
    token: {
        type: String,
        default: generateID(),
    },
    confirmed: {
        type: Boolean,
        default: false,
    }
})

vetSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

vetSchema.methods.checkPassword =  async function(formPassword) {
    return bcrypt.compareSync(formPassword, this.password)
}

const Vet = mongoose.model("vet", vetSchema);
export default Vet;