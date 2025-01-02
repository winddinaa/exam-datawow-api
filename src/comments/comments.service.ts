import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<any>,
  ) {}

  // สร้าง Comment ใหม่
  async createComment(data: { text: string; author: string; post: string }) {
    console.log('=> data', data);
    const newComment = new this.commentModel(data);
    return newComment.save();
  }

  // ดึง Comment ทั้งหมดของโพสต์
  async getCommentsByPost(postId: string) {
    return this.commentModel.find({ post: postId }).populate('author').exec();
  }
}
