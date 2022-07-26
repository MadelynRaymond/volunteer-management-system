import express from 'express';
import volunteerRoute from './routes/volunteer';


const app = express()


app.use(express.json())
app.use('/Volunteers', volunteerRoute)

const port = 8080

app.get('/', (req, res) => {
    res.status(200).send({message: 'hello, world'})
})


app.listen(port, () => {
    console.log(`Listening on ${port}`)
} )

//Get all volunteers


