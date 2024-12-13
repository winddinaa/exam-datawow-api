import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentModule } from './comments/comments.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://ppongDataroom:ppongDataroom@exam.97vsh.mongodb.net/exam-datawow?retryWrites=true&w=majority&appName=exam"), // เชื่อมต่อกับ MongoDB
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    UsersModule,
    CommentModule

  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
