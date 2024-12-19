import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async getAllPosts() {
    return this.postModel
      .find()
      .populate('author')
      .populate('comments')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getPostByUser(userID: string) {
    return this.postModel
      .find({ author: userID }) // ใช้ find() เพื่อค้นหาโพสต์ทั้งหมดที่ author = userID
      .populate('author')
      .populate('comments')
      .sort({ createdAt: -1 })
      .exec();
  }
}
