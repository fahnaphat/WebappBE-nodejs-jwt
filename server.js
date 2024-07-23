import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import authRoutes from './routes/authRoutes.js'

dotenv.config({ path: './.env' })
const app = express()

const port = process.env.PORT || 5500

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // to parse form data

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI = process.env.DATABASE_MONGO
async function connectdb() {
    try {
        await mongoose.connect(dbURI)
        console.log('Connected to Mongodb')
    } catch (error) {
        console.log(error)
    }
}
// connectdb();

app.get('/', (req, res) => res.render('home'))
app.get('/post', (req, res) => res.render('post'))
// app.use((req, res, next) => {
//     console.log(`Request URL: ${req.url}, Method: ${req.method}`)
//     next()
// })
app.use(authRoutes)

app.listen((port), () => {
    console.log('Server started on port',port)
})