import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<any>,
    @InjectModel('Post') private readonly postModel: Model<any>,
  ) {}

  // สร้าง Comment ใหม่
  async createComment(data: { text: string; author: string; post: string }) {
    const newComment = new this.commentModel(data);
    newComment.save();

    return await this.postModel
      .findByIdAndUpdate(
        data.post, // ObjectId ของโพสต์ที่เกี่ยวข้อง
        { $push: { comments: { _id: newComment._id } } }, // เพิ่ม ObjectId ของคอมเมนต์ใหม่
        { new: true }, // ส่งคืนข้อมูลที่อัปเดตแล้ว
      )
      .populate('author')
      .populate({
        path: 'comments', // ดึง comments ของ Post
        populate: {
          path: 'author', // ดึง author ของแต่ละ Comment
          select: 'username', // เลือก field ที่ต้องการจาก User
        },
      })
      .exec();
  }

  // ดึง Comment ทั้งหมดของโพสต์
  async getCommentsByPost(postId: string) {
    return this.commentModel.find({ post: postId }).populate('author').exec();
  }
}
