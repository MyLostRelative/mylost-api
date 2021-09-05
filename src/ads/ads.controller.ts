import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AdInfoDTO, AdSearchDTO } from 'src/dto/ad-info.dto';
import { Ad } from 'src/models/ad';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Get('/search')
  async searchAds(@Query() query: AdSearchDTO): Promise<{ result: Ad[] }> {
    return this.adsService.search(query);
  }

  @Get()
  async getAds(): Promise<{ result: Ad[] }> {
    return this.adsService.getAds();
  }

  @Get('/:adId')
  async getAd(
    @Param('adId', ParseIntPipe) idId: number,
  ): Promise<{ result: Ad }> {
    return this.adsService.getAd(idId);
  }

  @Get('user/:userId')
  async getAdByUser(
    @Param('userId', ParseIntPipe) idId: number,
  ): Promise<{ result: Ad[] }> {
    return this.adsService.getAdByUser(idId);
  }

  @Post()
  async createAd(@Body() adInfo: AdInfoDTO): Promise<any> {
    return this.adsService.createAd(adInfo);
  }

  @Delete('/:adId')
  async deleteAd(@Param('adId', ParseIntPipe) adId: number): Promise<any> {
    return this.adsService.deleteAd(adId);
  }

  @Put('/:adId')
  async updateAd(
    @Param('adId', ParseIntPipe) adId: number,
    @Body() adInfo: AdInfoDTO,
  ): Promise<any> {
    return this.adsService.updateAd(adId, adInfo);
  }
}
