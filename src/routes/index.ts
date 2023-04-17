import {Router} from 'express'
import { createUserController } from '../controllers/user.controllers';


const router = Router();

router.post('/user', createUserController )

export {router}

