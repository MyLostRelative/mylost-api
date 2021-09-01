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
  male = 1,
  female,
  other,
}

export enum BloodType {
  a = 1,
  b,
  ab,
  o,
}

export enum RelationType {
  mother = 1,
  father,
  sister,
  brother,
  friend,
  other,
}
