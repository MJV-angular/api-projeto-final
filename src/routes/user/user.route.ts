import {Router} from 'express'
import { createUserController } from '../../controllers/user.controllers';
import { updateUserController } from '../../controllers/user.controllers';
import { deleteUserController } from '../../controllers/user.controllers';
const userRouter = Router();

userRouter.post('', createUserController )
userRouter.patch('/:id', updateUserController)
userRouter.delete('/:id', deleteUserController)

export default userRouter
