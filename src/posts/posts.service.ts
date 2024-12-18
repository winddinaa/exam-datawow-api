import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createPostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<any>) {}

  async createPost(data: createPostDto) {
    const newPost = new this.postModel(data);
    return newPost.save();
  }

  async getAllPosts() {
    return this.postModel.find().populate('author').populate('comments').exec();
  }

  async getPostById(id: string) {
    return this.postModel
      .findById(id)
      .populate('author')
      .populate('comments')
      .exec();
  }
}
