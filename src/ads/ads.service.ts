import { Injectable } from '@nestjs/common';
import { Ad } from '../models/ad';
import { ads } from '../data/ads.data';
import { AdInfoDTO, AdSearchDTO } from 'src/dto/ad-info.dto';

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
        userID: ad.userID,
        createDate: curDate,
      };
      this.adsDatabase.push(newAd);
    });
  }

  async search(query: AdSearchDTO): Promise<{ result: Ad[] }> {
    return { result: this.adsDatabase };
  }

  async getAds(): Promise<{ result: Ad[] }> {
    return { result: this.adsDatabase };
  }

  async getAd(adId: number): Promise<{ result: Ad }> {
    return { result: this.adsDatabase.find((ad) => ad.id === adId) };
  }

  async getAdByUser(userId: number): Promise<{ result: Ad[] }> {
    const foundData: Ad[] = [];
    this.adsDatabase.map((ad) => {
      if (ad.userID == userId) foundData.push(ad);
    });
    return { result: foundData };
  }

  async createAd(adInfo: AdInfoDTO): Promise<any> {
    if (adInfo.userID === undefined) return { result: 'no user ID' };
    const curDate: Date = new Date();
    const newId = this.adsDatabase.length
      ? this.adsDatabase[this.adsDatabase.length - 1].id + 1
      : 1;
    const newAd: Ad = {
      id: newId,
      title: adInfo.title,
      description: adInfo.description,
      imageUrl: adInfo.imageUrl,
      gender: adInfo.gender,
      city: adInfo.city,
      relationType: adInfo.relationType,
      bloodType: adInfo.bloodType,
      userID: adInfo.userID,
      createDate: curDate,
    };

    this.adsDatabase.push(newAd);
    return { result: newId };
  }

  async deleteAd(adId: number): Promise<any> {
    this.adsDatabase = this.adsDatabase.filter((ad) => ad.id !== adId);
    return { result: 'Ad is deleted' };
  }

  async updateAd(adId: number, adInfo: AdInfoDTO): Promise<any> {
    console.log(this.adsDatabase);
    const foundIndex = this.adsDatabase.findIndex(
      (adItem) => adItem.id === +adId && adItem.userID === +adInfo.userID,
    );

    let foundAd = this.adsDatabase[foundIndex];

    if (foundIndex > -1) {
      foundAd = {
        id: foundAd.id,
        title: adInfo.title,
        description: adInfo.description,
        imageUrl: adInfo.imageUrl,
        gender: adInfo.gender,
        city: adInfo.city,
        relationType: adInfo.relationType,
        bloodType: adInfo.bloodType,
        userID: foundAd.userID,
        createDate: foundAd.createDate,
      };
      this.adsDatabase[foundIndex] = foundAd;
      return { result: foundAd.id };
    }
    return { result: 'Ads info error' };
  }
}
