import express from "express"

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Home page</h1>')
})

app.listen(4000, () => {
    console.log('Sever started on port 4000')
})