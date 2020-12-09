import mongoose, { Schema } from 'mongoose';

const user = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true }, // display username
  usernameLower: { type: String, required: true, unique: true },
  email: String,
  profilePic: String,
  password: { type: String, required: true },
});

export default mongoose.model('User', user);
