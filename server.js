import express from "express"

const app = express()

// middleware
app.use(express.static('public'))

// view engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('home'));

app.listen(4000, () => {
    console.log('Sever started on port 4000')
})