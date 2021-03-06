import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routers/authRouter';
import messageRouter from './routers/messageRouter';
import roomRouter from './routers/roomRouter';
import Message from './models/messageModel';
import Room from './models/roomModel';
import User from './models/userModel';
import authMiddleware from './middleware/authMiddleware';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const MONGO_CONN = `mongodb://localhost:27017/tvMessagingAPI`;
const MONGO_OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
};

mongoose.connect(MONGO_CONN, MONGO_OPTS, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5000;

const server = express();

server.use(express.json());

server.use('/auth', authRouter(User));
server.use('/api/messages', authMiddleware, messageRouter(Message));
server.use('/api/rooms', authMiddleware, roomRouter(Room));

server.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.get('/error', () => {
  throw new Error('ERROR!!!');
});

server.use('*', (req, res) => {
  console.log(`Your route was not found`);

  return res.status(401).json({ error: `${req.method} ${req.baseUrl}${req.url} URL not found` });
});

// sentry error handling middleware

server.use(errorHandler);

const HTTPserver = server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default HTTPserver;
