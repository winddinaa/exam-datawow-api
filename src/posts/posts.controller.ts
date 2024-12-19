import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { createPostDto } from './dto/createPost.dto';
import { Request } from 'express';
import { updatePostDto } from './dto/updatePost.dto';
import { deletePostDto } from './dto/deletePost.dto';

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
      throw new HttpException(
        { message: 'Failed to create post', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updatePost(@Body() body: updatePostDto, @Req() req: Request) {
    try {
      const result = await this.postService.updatePost(body._id, {
        ...body,
      });

      return { data: result, status: 'success' };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to update post', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deletePost(@Body() body: deletePostDto, @Req() req: Request) {
    try {
      const result = await this.postService.deletePost(body._id, req.user._id);
      return { data: result, status: 'success' };
    } catch (error) {
      console.log('=> error', error);
      throw new HttpException(
        { message: 'Failed to delete post', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPosts(@Query() query: { isOur: boolean }, @Req() req: Request) {
    try {
      let result: any;
      if (query.isOur) {
        result = await this.postService.getPostByUser(req.user._id);
      } else {
        result = await this.postService.getAllPosts();
      }
      return { data: result || [], status: 'success' };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to get post', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
