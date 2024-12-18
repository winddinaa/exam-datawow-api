import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { createPostDto } from './dto/createPost.dto';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        username: string;
      }; // หรือจะกำหนดประเภท user เป็นประเภทที่ถูกต้อง เช่น IUser
    }
  }
}

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body: createPostDto, @Req() req: Request) {
    try {
      const result = await this.postService.createPost({
        ...body,
        author: req.user._id,
      });
      return { data: result, status: 'success' };
    } catch (error) {
      return { data: {}, status: 'failed' };
    }
  }

  @Get()
  async getAllPosts() {
    try {
      const result = await this.postService.getAllPosts();
      return { data: result, status: 'success' };
    } catch (error) {
      return { data: {}, status: 'failed' };
    }
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
}
