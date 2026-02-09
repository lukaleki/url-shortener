import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlDto } from './DTO/url.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async shortenUrl(@Body() url: UrlDto): Promise<string> {
    return await this.appService.shortenUrl(url);
  }

  @Get('/:code')
  async redirect(@Param('code') code: string): Promise<string> {
    return await this.appService.redirect(code);
  }
}
