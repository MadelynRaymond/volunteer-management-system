import { Prisma } from '@prisma/client'
import express from 'express'
import prisma from '../prisma-init'

const loginRoute = express.Router()

loginRoute.get('/', async (req, res) => {
    
    const adminLogin = await prisma.user.findUnique({
        where: {
            id: 1,
        }
    })
    res.status(200).send(adminLogin)
  })

export default loginRoute

