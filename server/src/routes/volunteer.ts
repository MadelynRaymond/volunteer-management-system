import { Prisma } from '@prisma/client'
import express from 'express'
import prisma from '../prisma-init'

const volunteerRoute = express.Router()

//Get all volunteers
volunteerRoute.get('/', async (req, res) => {
    
  const volunteers = await prisma.user.findMany({
      where: {
          role: 'VOLUNTEER'
      },
      include: {
        profile: {
          include: {
            emergencyInfo: true
          }
        }
      }
  })

  res.status(200).send(volunteers)

})

//Create volunteer
//TODO: Add query validation
volunteerRoute.post('/', async (req, res) => {

  const accountInfo = req.body.accountInfo //username, password
  const emergencyInfo = req.body.emergencyInfo //firstName, lastName, address, cellPhoneNumber,email, driversLicenseOnFile, socialSecurityOnFile, approvalStatus,
  const personalInfo = req.body.personalInfo //contactName, contactHomePhoneNumber
  
  const volunteer = await prisma.user.create({
      data: {
          ...accountInfo,
          role: 'VOLUNTEER',
          profile: {
            create: {
              ...personalInfo,
              emergencyInfo: {
                create: {
                  ...emergencyInfo
                }
              }
            }
          },
         
      }
  })
  res.status(201).send(volunteer)
})



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
    console.log(e)
    res.sendStatus(500)
  }

})


export default volunteerRoute