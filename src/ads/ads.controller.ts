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
  getAds(): { result: Ad[] } {
    return { result: this.adsService.getAds() };
  }

  @Get('/:adId')
  getAd(@Param('adId', ParseIntPipe) idId: number): { result: Ad } {
    return { result: this.adsService.getAd(idId) };
  }

  @Post()
  createAd(@Body() ad: Ad): void {
    this.adsService.createAd(ad);
  }

  @Delete('/:adId')
  deleteAd(@Param('adId', ParseIntPipe) adId: number): void {
    this.adsService.deleteAd(adId);
  }

  @Put()
  updateAd(@Body() ad: Ad): void {
    this.adsService.updateAd(ad);
  }
}
