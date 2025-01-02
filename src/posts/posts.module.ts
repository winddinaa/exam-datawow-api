import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  providers: [PostService],
  controllers: [PostController],
  exports: [MongooseModule],
})
export class PostsModule {}
