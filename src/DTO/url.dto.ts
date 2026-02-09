import { IsNotEmpty, IsUrl } from 'class-validator';

export class UrlDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
