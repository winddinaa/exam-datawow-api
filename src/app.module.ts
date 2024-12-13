import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UserSchema } from './users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ppongDataroom:ppongDataroom@exam.97vsh.mongodb.net/?retryWrites=true&w=majority&appName=exam'), // เชื่อมต่อกับ MongoDB
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // สร้างการเชื่อมต่อกับ User Schema
  ],
  controllers: [UsersController],
  providers: [UsersService],
})

export class AppModule {}
