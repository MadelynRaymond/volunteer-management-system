import express from 'express';
import cors from 'cors'
import bcrypt from 'bcrypt'
import volunteerRoute from './routes/volunteer';
import opportunitiesRoute from './routes/opportunities'
import loginRoute from './routes/login'
import prisma from './prisma-init'
const app = express()


app.use(cors({
    credentials: true,
    origin: '*'
}))
app.use(express.json())
app.use('/Volunteers', volunteerRoute)
app.use('/Opportunities', opportunitiesRoute)
app.use('/login', loginRoute)

const port = 8080

app.get('/', (req, res) => {
    res.status(200).send({message: 'hello, world'})
})

/*app.get('/Admin', async (req, res) => {
    const ad = await prisma.user.findMany({
        where: {
            role: 'ADMIN'
        }
    })

    res.status(200).send(ad)
})*/

app.post('/Admin', async (req, res) => {
    const {username, password} = req.body
    let user;
    bcrypt.genSalt((err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            user = await prisma.user.create({
                data: {
                    username,
                    password: hash,
                    role: 'ADMIN'
                }
            })
        })
    })

    res.status(201).send(user)
})

app.get('/Centers', async (req, res) => {

    const centers = await prisma.center.findMany()
    res.status(200).send(centers)
})

app.get('/Skills', async (req, res) => {
    const skills = await prisma.skill.findMany()
    res.status(200).send(skills)
})

app.post('/Skills', async (req, res) => {
    const skill = req.body.name
    
    const newSkill = await prisma.skill.create({
        data: {
            name: skill
        }
    })

    res.status(201).send(newSkill)
})

app.get('/Availability', async (req, res) => {
    const a = await prisma.availability.findMany()
    res.status(200).send(a)
})

app.post('/Availability', async (req, res) => {
    const time = req.body.time

    const result = await prisma.availability.create({
        data: {
            time
        }
    })

    res.status(201).send(result)
})

app.post('/Centers', async (req, res) => {
    const {name} = req.body

    const echo = await prisma.center.create({
        data: {
            name
        }
    })

    res.status(201).send(echo)
})

app.listen(port, () => {
    console.log(`Listening on ${port}`)
} )

//Get all volunteers


