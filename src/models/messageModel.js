import mongoose, { Schema } from 'mongoose';

const model = new Schema({
  user: String,
  message: { type: String, required: true },
  room: String,
});

export default mongoose.model('Message', model);
