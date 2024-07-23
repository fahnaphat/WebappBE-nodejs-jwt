import User from '../models/User.js'

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
        console.log(err)
        res.status(400).send('error, user not created')
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