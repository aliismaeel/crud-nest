import { Schema } from 'mongoose';

export const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  userRole: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
    require: true,
  },
});
