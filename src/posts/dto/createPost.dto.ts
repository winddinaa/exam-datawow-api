import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class createPostDto {
  @IsString()
  @IsNotEmpty()
  community: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  author: string;
}
