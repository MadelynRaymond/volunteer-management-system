import { Prisma } from '@prisma/client'
import express from 'express'
import prisma from '../prisma-init'

const volunteerRoute = express.Router()

//Get all volunteers
volunteerRoute.get('/', async (req, res) => {
    
  const volunteers = await prisma.user.findMany({
      where: {
          role: 'VOLUNTEER'
      }
  })

  res.status(200).send(volunteers)

})

//Create volunteer
//TODO: Add query validation
volunteerRoute.post('/', async (req, res) => {
  const volunteer = await prisma.user.create({
      data: {
          //TODO: include profile in query
          username: req.body.username,
          password: req.body.password,
          role: 'VOLUNTEER'
      }
  })
  res.status(201).send(volunteer)
})

//TODO: Update Volunteer


//Delete volunteer
//TODO: Add query validation
volunteerRoute.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  
  try {
    await prisma.user.delete({
      where: {
          id 
      }
    })
    res.sendStatus(203)
  }

  catch(e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
      res.status(404).send({message: 'user not found'})
    }
  }

})


export default volunteerRoute