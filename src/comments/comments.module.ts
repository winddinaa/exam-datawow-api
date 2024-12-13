import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comments.schema';
import { CommentService } from './comments.service';
import { CommentController } from './commnet.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
