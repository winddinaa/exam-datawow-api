import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const user = await this.usersService.validateUser(loginDto);
    const result = await this.usersService.login(user);
    res.cookie('token', result.access_token, {
      httpOnly: true,
      secure: false, // true ถ้าใช้ HTTPS
      sameSite: 'none', // หรือ 'none' สำหรับ cross-origin
      maxAge: 7200000, // อายุ cookie 1 ชั่วโมง
    });
    res.json({ ...result, username: loginDto.username });
  }
}
