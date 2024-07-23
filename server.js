import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config({ path: './.env' })
const app = express()

const port = process.env.PORT || 5500

// middleware
app.use(express.static('public'))

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

connectdb();

app.get('/', (req, res) => res.render('home'))
app.get('/post', (req, res) => res.render('post'))

app.listen((port), () => {
    console.log('Server started on port',port)
})