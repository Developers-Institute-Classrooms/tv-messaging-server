import express from 'express';

/**
 * @typedef Message
 * @property {string} user - User ID
 * @property {string} message - Actual message
 * @property {string} room - Room ID 
 */

const messageRouter = (Message) => {
  const router = express.Router();

  // CREATE
  router.post('/', async (req, res) => {
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
  router.get('/', async (req, res) => {
    try {
      // get the messages out of the database
      const messages = await Message.find({});
      console.log(messages);

      // return messages array to the client
      return res.status(200).json(messages);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  // UPDATE
  router.patch('/:messageId', async (req, res) => {
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
  router.delete('/:messageId', async (req, res) => {
    // 1. extract the messageId from the URL
    const { messageId } = req.params;
    // 2. use the findByIdAndDelete method
    const deleteMessage = await Message.findByIdAndDelete(messageId);
    return res.status(200).json(deleteMessage);
  });

  return router;
};

export default messageRouter;
