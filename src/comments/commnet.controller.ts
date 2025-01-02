import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { createCommnetDto } from './dto/createPost.dto';
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

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() body: createCommnetDto, @Req() req: Request) {
    return this.commentService.createComment({ ...body, author: req.user._id });
  }

  @Get('post/:postId')
  async getCommentsByPost(@Param('postId') postId: string) {
    return this.commentService.getCommentsByPost(postId);
  }
}
