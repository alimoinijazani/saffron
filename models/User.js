import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String },
    // email: {
    //   type: String,
    //   unique: false,
    // },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    mobile: {
      type: String,
      // required: function () {
      //   return !this.email;
      // },
      index: { sparse: true },
      unique: false,
    },
  },
  { timeStamps: true }
);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
