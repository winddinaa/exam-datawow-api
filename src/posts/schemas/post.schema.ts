import { Schema } from 'mongoose';

export const PostSchema = new Schema({
  title: { type: String, required: true }, 
  content: { type: String, required: true }, 
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], 
}, { timestamps: true });