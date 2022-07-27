import { Prisma } from '@prisma/client'
import express from 'express'
import prisma from '../prisma-init'

const opportunitiesRoute = express.Router()


opportunitiesRoute.post('/', async (req, res) => {
    const { name, startTime, endTime, centerId, location, description } = req.body

    const opportunity = await prisma.opportunity.create({
        data: {
            name,
            startTime,
            endTime,
            centerId,
            location,
            description
        }
    })
    res.status(201).send(opportunity)
})

opportunitiesRoute.delete('/:id', async (req, res) => {

    const id = parseInt(req.params.id)

    try {
        await prisma.opportunity.delete({
          where: {
              id 
          }
        })
        res.sendStatus(203)
      }
      
      catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
          res.status(404).send({message: 'Opportunity not found'})
        }
        res.sendStatus(500)
      }
})


export default opportunitiesRoute