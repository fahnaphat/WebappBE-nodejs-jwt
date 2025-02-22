import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

//create Schema for database
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter youre firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter youre lastname']
    },
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

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    // use _this_ to refer to data before it's added to db.
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)

export default User;