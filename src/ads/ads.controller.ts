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
  getAds(): Ad[] {
    return this.adsService.getAds();
  }

  @Get('/:adId')
  getAd(@Param('adId', ParseIntPipe) idId: number): Ad {
    return this.adsService.getAd(idId);
  }

  @Post()
  createAd(@Body() ad: Ad): void {
    this.adsService.createAd(ad);
  }

  @Delete('/:id')
  deleteAd(@Param('id', ParseIntPipe) id: number): void {
    this.adsService.deleteAd(id);
  }

  @Put()
  updateAd(@Body() ad: Ad): void {
    this.adsService.updateAd(ad);
  }
}
