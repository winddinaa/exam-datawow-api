import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentModule } from './comments/comments.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://ppongDataroom:ppongDataroom@exam.97vsh.mongodb.net/exam-datawow?retryWrites=true&w=majority&appName=exam"), // เชื่อมต่อกับ MongoDB
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    UsersModule,
    CommentModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // ถ้าใช้ ConfigModule เพื่อดึงข้อมูลจาก .env
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // ดึงค่า secret จาก .env
        signOptions: {
          expiresIn: '60m', // กำหนดเวลาหมดอายุของ JWT
        },
      }),
    }),

  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
