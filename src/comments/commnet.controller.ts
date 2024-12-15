import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { CommentService } from './comments.service';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() body: any) {
    return this.commentService.createComment(body);
  }

  @Get('post/:postId')
  async getCommentsByPost(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPost(postId);
  }
}
