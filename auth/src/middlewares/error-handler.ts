import { Request, Response, NextFunction } from "express";
import { DatabaseConnectionError } from "../error/database-connection-error";
import { NotFoundError } from "../error/not-found-error";
import { RequestValidationError } from "../error/request-validation-error";

export const errorHandler = (
  err : Error,
  req : Request,
  res : Response,
  next : NextFunction
) => {
 
  if(err instanceof RequestValidationError){  
    console.log('in error handler, making life easy'); 
    return res.status(err.statusCode).send(err.serializeError());
  }

  if(err instanceof DatabaseConnectionError){
    return res.status(err.statusCode).send(err.serializeError());
  }
  
  if(err instanceof NotFoundError){
    return res.status(err.statusCode).send(err.serializeError());
  }

  res.status(400).send([
    {message : 'something went wrong'}
  ]);
}