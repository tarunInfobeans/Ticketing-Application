import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  
  statusCode = 400;

  constructor ( public errors : ValidationError[]) {
    super();
    console.log('inside constructor of request validation error');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  
  serializeError () {
    console.log('here in request validation error inside serialize error function');
    return this.errors.map(err => {
        return ({ message : err.msg, field : err.param });
    })
  }
}