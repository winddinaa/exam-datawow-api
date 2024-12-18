import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './interfaces/user.interface';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: User) {
    const payload = { username: user.username, sub: user._id };
    const secret = this.configService.get<string>('JWT_SECRET');
    return {
      access_token: this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: '300m',
      }),
    };
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel({ ...user });
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserById(id: string) {
    return this.userModel.findById(id).exec();
  }

  //#region auth
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // กำหนดจำนวนรอบการสร้าง salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const { username } = loginDto;

    // ค้นหาผู้ใช้จากฐานข้อมูล
    let user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      await this.create(loginDto as User);
      user = await this.userModel.findOne({ username }).exec();
    }

    return user; // หาก password ผิด
  }
  //#endregion
}
