import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class updatePostDto {
  @IsString()
  @IsNotEmpty()
  community: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  _id: string;
}
