import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class createCommnetDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  post: string;
}
