import mongoose, { Schema } from 'mongoose';

const model = new Schema({
  name: { type: String, required: true },
  admins: [ String ]
});

export default mongoose.model('Room', model);
