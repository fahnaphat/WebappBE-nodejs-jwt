import jwt from "jsonwebtoken";
import User from '../models/User.js';

const requireAuth = (req, res, next) => {
    // request cookies which name jwt
    const token = req.cookies.jwt

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next();
            }
        })
    } else {
        res.redirect('/login')
    }

}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.username = null
                next();
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.username = user
                next();
            }
        })
    } else {
        res.locals.username = null
        next();
    }
}

export default { requireAuth, checkUser };