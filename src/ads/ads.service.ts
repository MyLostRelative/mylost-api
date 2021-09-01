import { Injectable } from '@nestjs/common';
import { Ad } from '../models/ad';
import { ads } from '../data/ads.data';

@Injectable()
export class AdsService {
  private ads: Ad[] = [];
  constructor() {
    this.ads = ads;
  }

  getAds(): Ad[] {
    return this.ads;
  }

  getAd(adId: number): Ad {
    return this.ads.find((ad) => ad.id === adId);
  }

  createAd(ad: Ad): void {
    ad.id = this.ads.length ? this.ads[this.ads.length - 1].id + 1 : 1;
    this.ads.push(ad);
  }

  deleteAd(adId: number): void {
    this.ads = this.ads.filter((ad) => ad.id !== adId);
  }

  updateAd(ad: Ad): void {
    const foundIndex = this.ads.findIndex((adItem) => adItem.id === +ad.id);
    if (foundIndex > -1) {
      this.ads[foundIndex] = ad;
    }
  }
}
