import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    mobile: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);
const user1 = mongoose.models.user1 || mongoose.model('user1', userSchema);

export default user1;
