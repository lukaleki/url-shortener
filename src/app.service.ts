import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlDto } from './DTO/url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './Entities/url.entity';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}
  async shortenUrl(urlDto: UrlDto): Promise<string> {
    const { url } = urlDto;
    const code = nanoid(10);
    const baseUrl = 'localhost:3000';
    const newUrl = this.urlRepository.create({
      urlCode: code,
      longUrl: url,
      createdAt: new Date(),
    });

    await this.urlRepository.save(newUrl);

    return `${baseUrl}/${code}`;
  }

  async redirect(code: string): Promise<string> {
    if (!code) {
      throw new NotFoundException();
    }
    const url = await this.urlRepository.findOne({
      where: { urlCode: code },
    });
    if (!url) {
      throw new NotFoundException(`${code} not found`);
    }

    return url.longUrl;
  }
}
