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

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc)
    // for end of this function
    next(); 
})

// fire a function before doc saved to db
userSchema.pre('save', function (next) {
    console.log('user about to be created & saved', this)
    next();
})

const User = mongoose.model('user', userSchema)

export default User;