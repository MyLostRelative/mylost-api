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
        age: ad.age,
      };
      this.adsDatabase.push(newAd);
    });
  }

  async search(query: AdSearchDTO): Promise<{ result: Ad[] }> {
    return { result: this.adsDatabase };
  }

  async getAds(query: AdSearchDTO): Promise<{ result: Ad[] }> {
    if (
      !(
        query.relationType ||
        query.gender ||
        query.fromAge ||
        query.toAge ||
        query.bloodType ||
        query.city ||
        query.query
      )
    ) {
      return { result: this.adsDatabase };
    }
    const filteredData: Ad[] = this.adsDatabase
      .filter((ad) =>
        query.relationType ? ad.relationType === query.relationType : true,
      )
      .filter((ad) => (query.gender ? ad.gender === query.gender : true))
      .filter((ad) => (+query.fromAge ? ad.age >= query.fromAge : true))
      .filter((ad) => (+query.toAge ? ad.age <= query.toAge : true))
      .filter((ad) =>
        query.bloodType ? ad.bloodType === query.bloodType : true,
      )
      .filter((ad) => (query.city ? ad.city === query.city : true))
      .filter((ad) =>
        query.query
          ? ad.description.includes(query.query) ||
            ad.title.includes(query.query)
          : true,
      );
    return { result: filteredData };
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
      userID: +adInfo.userID,
      createDate: curDate,
      age: +adInfo.age,
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
        age: foundAd.age,
      };
      this.adsDatabase[foundIndex] = foundAd;
      return { result: foundAd.id };
    }
    return { result: 'Ads info error' };
  }
}
