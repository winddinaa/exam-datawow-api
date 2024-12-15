import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);
