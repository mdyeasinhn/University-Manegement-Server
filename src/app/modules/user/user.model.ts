import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';


const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'student',],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default : 'in-progress'
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// set '' after saveing password

userSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'Post hook : we saved our data ');
  next();
});

export const User = model<TUser>('User', userSchema);