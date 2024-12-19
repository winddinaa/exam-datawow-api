import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class deletePostDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
