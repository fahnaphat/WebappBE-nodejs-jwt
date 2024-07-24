import mongoose from "mongoose";
import validator from "validator";

//create Schema for database
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minLength: [6, 'Minimum password length is 6 charecters']
    }
})

const User = mongoose.model('user', userSchema)

export default User;