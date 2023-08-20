import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class BookmarkDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  link: string;
}
