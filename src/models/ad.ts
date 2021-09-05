export class Ad {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  gender?: Gender;
  city?: string;
  relationType?: RelationType;
  bloodType?: BloodType;
  userID: number;
  createDate: Date;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum BloodType {
  O = 'o',
  A = 'a',
  B = 'b',
  AB = 'ab',
}

export enum RelationType {
  MOTHER = 'mother',
  FATHER = 'father',
  SISTER = 'sister',
  BROTHER = 'brother',
  SON = 'son',
  DAUGHTER = 'daughter',
  FRIEND = 'friend',
  OTHER = 'other',
}
