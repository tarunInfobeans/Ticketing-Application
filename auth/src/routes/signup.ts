import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../error/request-validation-error';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup',  [
  body('email')
    .isEmail()
    .withMessage('Email not Valid'),
  body('password')
    .trim()
    .isLength({ min:5, max:20})
    .withMessage('Password must be 5 character long & shorter then 20 characters')
], async (req : Request, res : Response, next : NextFunction) => {
  
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      //throw new Error('something wrong with password or email or both');
      /** suppose this is javascript & not ts
       * const error = new Error (" invalid password or email");
       * error.reason = errors.Array();
       * throw error;
       */
      throw new RequestValidationError(errors.array());
    }

    // For checking various error
    // console.log('databaseconnnectionError');
    // throw new DatabaseConnectionError();
    // throw new Error();
    
    //throw new Error();
    //throw new Error();

    const { email, password } =  req.body;
    // try{
    //   const existingUser = await User.findOne({ email });
    //   if(existingUser){
    //     console.log('email already in use');
    //     res.send('email already in use');
    //   }
    //   console.log('i am here....');
    // }
    // catch{
    //   const user = User.build({ email, password });
    //   user.save();
    //   res.status(201).send(user);
    // }
    // const user = User.build({ email, password });
    // user.save();
    //res.status(201).send('task completed');

    const existingUser = await User.findOne({ email });
    if(existingUser){
      console.log('user already present');
      return res.send({});
    }

    const user = User.build({ email, password});
    await user.save();
    console.log(User.collection.find());
    res.status(201).send(user);
  }
  catch(err){
    console.error(err);
    next(err)  
  }
});

export { router as signup };