import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signin } from './routes/signin';
import { signout } from './routes/signout';
import { signup } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './error/not-found-error';
import mongoose from 'mongoose';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signup);
app.use(signin);
app.use(signout);

app.all('*', () => {
  console.log('I am heererererer');
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connected to mongodb');
  }
  catch(err){
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('listening on 3000..');
  });
};
start();