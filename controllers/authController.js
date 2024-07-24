import User from '../models/User.js'

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' }

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


export const signup_get = (req, res) => {
    res.render('register')
}

export const signup_post = async (req, res) => {
    const { email, password } = req.body

    try {
        //Adding data to database
        const user = await User.create({ email, password })
        res.status(201).json(user)

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

export const login_post = (req, res) => {
    const { email, password } = req.body

    console.log(email, password)
    res.send('user login')
}