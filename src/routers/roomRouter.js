// setup the router
import express from 'express';

// Router function
const roomRouter = (Room) => {
  const router = express.Router();

  // CRUD routes
  // name: { type: String, required: true },
  // admins: [ String ]

  // CREATE/POST
  router.post('/', async (req, res) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name required!' });
      }

      const newRoom = new Room(req.body);
      const savedRoom = await newRoom.save();

      console.log('savedRoom', savedRoom);

      return res.status(201).json(savedRoom);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  // READ/GET
  router.get('/', async (req, res) => {
    try {
      // get the rooms out of the database
      const rooms = await Room.find({});
      console.log(rooms);

      // return rooms array to the client
      return res.status(200).json(rooms);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  // UPDATE/PATCH
  router.patch('/:roomId', async (req, res) => {
    try {
      console.log(req.body);

      const { roomId } = req.params;
      const updateObject = {};

      if (req.body.name) {
        updateObject.name = req.body.name;
      }
      if (req.body.admins && req.body.admins.length > 0) {
        updateObject.$push = { admins: req.body.admins[0] }
      }
      console.log('updateObject', updateObject);

      const updatedRoom = await Room.findByIdAndUpdate(
        roomId,
        updateObject,
        { new: true }
      );
      console.log(updatedRoom);

      return res.status(200).json(updatedRoom);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  // DELETE/DELETE
  router.delete('/:roomId', async (req, res) => {
    // 1. extract the roomId from the URL
    const { roomId } = req.params;
    // 2. use the findByIdAndDelete method
    const deleteMessage = await Room.findByIdAndDelete(roomId);
    return res.status(200).json(deleteMessage);
  });

  return router;
};

export default roomRouter;
