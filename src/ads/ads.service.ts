import { Injectable } from '@nestjs/common';
import { Ad } from '../models/ad';
import { ads } from '../data/ads.data';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdsService {
  private adsDatabase: Ad[] = [];
  constructor() {
    ads.map((ad) => {
      const curDate: Date = new Date();
      const newId = this.adsDatabase.length
        ? this.adsDatabase[this.adsDatabase.length - 1].id + 1
        : 1;
      const newAd: Ad = {
        id: newId,
        title: ad.title,
        description: ad.description,
        imageUrl: ad.imageUrl,
        gender: ad.gender,
        city: ad.city,
        relationType: ad.relationType,
        bloodType: ad.bloodType,
        userID: 1,
        createData: curDate,
      };
      this.adsDatabase.push(newAd);
    });
  }

  getAds(): Ad[] {
    return this.adsDatabase;
  }

  getAd(adId: number): Ad {
    return this.adsDatabase.find((ad) => ad.id === adId);
  }

  createAd(ad: Ad): void {
    ad.id = this.adsDatabase.length
      ? this.adsDatabase[this.adsDatabase.length - 1].id + 1
      : 1;
    this.adsDatabase.push(ad);
  }

  deleteAd(adId: number): void {
    this.adsDatabase = this.adsDatabase.filter((ad) => ad.id !== adId);
  }

  updateAd(ad: Ad): void {
    const foundIndex = this.adsDatabase.findIndex(
      (adItem) => adItem.id === +ad.id,
    );
    if (foundIndex > -1) {
      this.adsDatabase[foundIndex] = ad;
    }
  }
}
