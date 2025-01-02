import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comments.schema';
import { CommentService } from './comments.service';
import { CommentController } from './commnet.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    PostsModule, // เพิ่ม PostsModule
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
