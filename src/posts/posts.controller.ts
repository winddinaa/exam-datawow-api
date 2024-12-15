import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PostService } from './posts.service';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() body: any) {
    return this.postService.createPost(body);
  }

  @Get()
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }
}
