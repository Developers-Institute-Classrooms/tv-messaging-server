import express from 'express';
import mongoose from 'mongoose';
import Message from './models/messages';

const MONGO_CONN = `mongodb://localhost:27017/tvMessagingAPI`;
const MONGO_OPTS = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

mongoose.connect(MONGO_CONN, MONGO_OPTS, (err) => {
	if (err) {
		console.error(err);
	}
	console.log('Connected to MongoDB');
});

const PORT = 5000;

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World"); 
});

server.post('/messages', async (req, res) => {
	const { message } = req.body;

	if (!message) {
		return res.status(400).json({ error: 'Message text required!' });
	}

	const newMessage = new Message(req.body);
	const savedMessage = await newMessage.save();

	console.log('savedMessage:', savedMessage);

	return res.status(201).json(savedMessage);
});

const HTTPserver = server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default HTTPserver;
