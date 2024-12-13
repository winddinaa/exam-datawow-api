import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
  text: { type: String, required: true }, // เนื้อหา Comment
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // อ้างอิงไปที่ผู้เขียน (User)
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // อ้างอิงไปที่โพสต์
}, { timestamps: true });
