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

  const {username, password, firstName, lastName, address, cellPhoneNumber,
     email, driversLicenseOnFile, socialSecurityOnFile, approvalStatus,
     contactName, contactHomePhoneNumber} = req.body
  
  const volunteer = await prisma.user.create({
      data: {
          //TODO: include profile in query
          username,
          password,
          role: 'VOLUNTEER',
          profile: {
            create: {
              firstName, 
              lastName, 
              address, 
              cellPhoneNumber,
              email,
              driversLicenseOnFile,
              socialSecurityOnFile,
              approvalStatus,
              emergencyInfo: {
                create: {
                  contactName,
                  contactHomePhoneNumber    
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
  res.send("hiii")
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