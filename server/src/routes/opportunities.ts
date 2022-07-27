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



export default opportunitiesRoute