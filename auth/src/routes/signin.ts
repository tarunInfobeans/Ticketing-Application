import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {

  res.send('xyz...');

});

export { router as signin };