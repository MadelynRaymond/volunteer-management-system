import { Prisma } from '@prisma/client'
import express from 'express'
import bcrypt from 'bcrypt'
import prisma from '../prisma-init'
import jwt from 'jsonwebtoken';

const loginRoute = express.Router()
const SECRET = '25C2EB8716AA4472146BD16B6BA94'

loginRoute.get('/:username/:password', async (req, res) => {
    let token = undefined
    const username = req.params.username
    const password = req.params.password
    const adminLogin = await prisma.user.findUnique({
        where: {
            username,
        }
    })

    if(adminLogin){

        const hash = adminLogin.password
        const match = await bcrypt.compare(password, hash)

        if(match){
            token = jwt.sign({username}, SECRET, {expiresIn: '1h'})
        }
    }

    token ? res.status(200).send({token}) : res.status(401).send({message: 'incorrect login'})
  })

export default loginRoute

