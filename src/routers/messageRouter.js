import express from 'express';

/**
 * @typedef Message
 * @property {string} user - User ID
 * @property {string} message - Actual message
 * @property {string} room - Room ID 
 */

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization header required!' });
  }

  // check the authorization string is in the correct bearer scheme
  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid Bearer string!' });
  }

  // split the token from the Bearer string
  const encodedToken = authorization.split(' ')[1];
  console.log(encodedToken);

  // decode the token from base64 encoding
  const decodedToken = Buffer.from(encodedToken, 'base64').toString('utf8');
  const token = JSON.parse(decodedToken);
  console.log(token);

  // check the property of the token - check for authenticated property
  if (!token.authenticated || !token.userId) {
    return res.status(401).json({ error: 'Not authenticated!' });
  }

  next();
};

const messageRouter = (Message) => {
  const router = express.Router();

  // CREATE
  router.post('/', authMiddleware, async (req, res) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message text required!' });
      }

      const newMessage = new Message(req.body);
      const savedMessage = await newMessage.save();

      console.log('savedMessage:', savedMessage);

      return res.status(201).json(savedMessage);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  // READ
  /**
   * @returns {Message[]}
   */
  router.get('/', authMiddleware, async (req, res) => {
    try {
      console.log(req.headers);

      // get the messages out of the database
      const messages = await Message.find({});
      // console.log(messages);

      // return messages array to the client
      return res.status(200).json(messages);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  // UPDATE
  router.patch('/:messageId', authMiddleware, async (req, res) => {
    try {
      const { messageId } = req.params;

      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        req.body,
        { new: true }
      );

      return res.status(200).json(updatedMessage);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  // DELETE
  router.delete('/:messageId', authMiddleware, async (req, res) => {
    try {
    // 1. extract the messageId from the URL
    const { messageId } = req.params;
    // 2. use the findByIdAndDelete method
    const deleteMessage = await Message.findByIdAndDelete(messageId);
    return res.status(200).json(deleteMessage);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  return router;
};

export default messageRouter;
