import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createPostDto } from './dto/createPost.dto';
import { updatePostDto } from './dto/updatePost.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<any>) {}

  async createPost(data: createPostDto) {
    const newPost = new this.postModel(data);
    return newPost.save();
  }

  async updatePost(id: string, data: updatePostDto) {
    return this.postModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deletePost(id: string, userId: string) {
    const post = await this.postModel.findById(id);
    console.log('=> post', post);
    console.log('=> userId', userId);
    console.log('=> post.author', post.author);
    if (!post) {
      throw new Error('Post not found');
    }
    if (!post.author.equals(new Types.ObjectId(userId))) {
      throw new Error('You are not authorized to delete this post');
    }

    return this.postModel.findByIdAndDelete(id);
  }

  async getAllPosts() {
    return this.postModel
      .find()
      .populate('author')
      .populate({
        path: 'comments', // ดึง comments ของ Post
        populate: {
          path: 'author', // ดึง author ของแต่ละ Comment
          select: 'username', // เลือก field ที่ต้องการจาก User
        },
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getPostByUser(userID: string) {
    return this.postModel
      .find({ author: userID })
      .populate('author')
      .populate('comments')
      .sort({ createdAt: -1 })
      .exec();
  }
}
