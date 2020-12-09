// setup the router
import express from 'express';

// Router function
const roomRouter = (Room) => {
  const router = express.Router();

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

  router.patch('/:roomId', async (req, res) => {
    try {
      const { roomId } = req.params;
      const { admins /** 'add' || 'remove' */ } = req.query;
      const updateObject = {};

      if (req.body.name) {
        updateObject.name = req.body.name;
      }

      if (admins === 'add' || undefined) {
        if (req.body.admins && req.body.admins.length > 0) {
          updateObject.$push = { 'admins': { $each: req.body.admins } };
        }
      }
      if (admins === 'remove') {
        if (req.body.admins && req.body.admins.length > 0) {
          updateObject.$pull = { 'admins': { $in: req.body.admins } };
        }
      }

      console.log('updateObject', updateObject);

      const updatedRoom = await Room.findByIdAndUpdate(roomId, updateObject, {
        new: true,
      });
      console.log(updatedRoom);

      return res.status(200).json(updatedRoom);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  // DELETE/DELETE
  router.delete('/:roomId', async (req, res) => {
    try {
      const { roomId } = req.params;
      const deleteMessage = await Room.findByIdAndDelete(roomId);
      return res.status(200).json(deleteMessage);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });

  return router;
};

export default roomRouter;
