import mongoose, { Schema } from 'mongoose';

const user = new Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, required: true },
  email: String,
  profilePic: String,
  password: { type: String, required: true },
});

export default mongoose.model('User', user);
