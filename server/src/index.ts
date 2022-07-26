import express from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

const app = express()
app.use(express.json())
const port = 8080

app.get('/', (req, res) => {
    res.status(200).send({message: 'hello, world'})
})


app.listen(port, () => {
    console.log(`Listening on ${port}`)
} )

//Get all volunteers
app.get('/Volunteers', async (req, res) => {
    
    const volunteers = await prisma.user.findMany({
        where: {
            role: 'VOLUNTEER'
        }
    })

    res.status(200).send(volunteers)

})

//Create volunteer
app.post('/Volunteer', async (req, res) => {
    const volunteer = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
            role: 'VOLUNTEER'
        }
    })
    res.status(201).send(volunteer)
})


//Delete volunteer
app.delete('/Volunteer/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    await prisma.user.delete({
        where: {
            id 
        }
    })
    res.sendStatus(203)
})

