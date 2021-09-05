import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Ad } from 'src/models/ad';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Get()
  async getAds(): Promise<{ result: Ad[] }> {
    return { result: this.adsService.getAds() };
  }

  @Get('/:adId')
  async getAd(
    @Param('adId', ParseIntPipe) idId: number,
  ): Promise<{ result: Ad }> {
    return { result: this.adsService.getAd(idId) };
  }

  @Get('user/:userId')
  async getAdByUser(
    @Param('userId', ParseIntPipe) idId: number,
  ): Promise<{ result: Ad[] }> {
    return { result: this.adsService.getAdByUser(idId) };
  }

  @Post()
  async createAd(@Body() ad: Ad): Promise<void> {
    this.adsService.createAd(ad);
  }

  @Delete('/:adId')
  async deleteAd(@Param('adId', ParseIntPipe) adId: number): Promise<void> {
    this.adsService.deleteAd(adId);
  }

  @Put()
  async updateAd(@Body() ad: Ad): Promise<void> {
    this.adsService.updateAd(ad);
  }
}
