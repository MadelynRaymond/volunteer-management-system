import express from 'express'
import prisma from '../prisma-init'
import { Prisma } from '@prisma/client'

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
            emergencyInfo: true,
            preferredCenters: {
              include: {
                center: true
              }
            },
            availability: {
              include: {
                availability: true
              }
            }
          }
        }
      }
  })



  res.status(200).send(volunteers)

})

volunteerRoute.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  const volunteer = await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      profile: {
        include: {
          emergencyInfo: true
        }
      }
    }
  })

  res.status(200).send(volunteer)

})

//Create volunteer
//TODO: Add query validation
volunteerRoute.post('/', async (req, res) => {

  const accountInfo = req.body.accountInfo //username, password
  const emergencyInfo = req.body.emergencyInfo //firstName, lastName, address, cellPhoneNumber,email, driversLicenseOnFile, socialSecurityOnFile, approvalStatus,
  const personalInfo = req.body.personalInfo //contactName, contactHomePhoneNumber

  const centers = personalInfo.preferredCenters.map((center: any) => center.id)
  const availableTimes = personalInfo.availability.map((time: any) => time.id)

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
              },
              preferredCenters: {
                create: centers.map((id: number) => (
                  {
                    center: {
                      connect: {
                        id
                      }
                    }
                  }
                ))
              },
              availability: {
                create: availableTimes.map((id: number) => (
                  {
                    availability: {
                      connect: {
                        id
                      }
                    }
                  }
                ))
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
      res.status(404).send({message: 'User not found'})
    }
    res.sendStatus(500)
  }

})


export default volunteerRoute