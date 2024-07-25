import User from '../models/User.js';
import jwt from "jsonwebtoken";

// handle errors
const handleErrors = (err) => {
    // console.log(err.message, err.code)
    let errors = { firstname: '', lastname: '', email: '', password: '' }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'Email is already registered.'
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties)
            errors[properties.path] = properties.message 
        })
    }

    return errors;
}

const expireDate = 3 * 24 * 60 *60;     // 3 days in seconds
// create and use json web token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: expireDate
    })
}


export const signup_get = (req, res) => {
    res.render('register')
}

export const signup_post = async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    try {
        //Adding data to database
        const user = await User.create({ firstname, lastname, email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: expireDate * 1000 })     // maxAge of cookies expects a time in milliseconds
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }

    // console.log(email, password)
    // res.send('new signup')
}

export const login_get = (req, res) => {
    res.render('login')
}

export const login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        res.status(400).json({})
    }
}