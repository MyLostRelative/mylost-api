export interface Ad {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  gender?: Gender;
  city?: string;
  relationType?: RelationType;
  bloodType?: BloodType;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum BloodType {
  A = 'a',
  B = 'b',
  AB = 'ab',
  O = 'o',
}

export enum RelationType {
  MOTHER = 'mother',
  FATHER = 'father',
  SISTER = 'sister',
  BROTHER = 'brother',
  FRIENT = 'friend',
  OTHER = 'other',
}
