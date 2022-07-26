import express from 'express';

const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.status(200).send({message: 'hello, world'})
})


app.listen(port, () => {
    console.log(`Listening on ${port}`)
} )