import {RequestHandler} from 'express';
import jwt from 'jsonwebtoken';


const SECRET = '25C2EB8716AA4472146BD16B6BA94'

const authenticate: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if(authHeader){
        const authToken = authHeader.split(' ')[1];

        try {
            jwt.verify(authToken, SECRET);
            next();
        }
        catch(ex) {
            res.status(401).send({message: ex});
        }
    }
    else {
        res.status(401).send({status: 401, message: 'Invalid authorization header'})
    }

    
}


export {authenticate};