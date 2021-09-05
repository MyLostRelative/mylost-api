import { Gender } from './ad';

export class User {
  id: number;
  userName: string;
  salt?: string;
  passwordHash?: string;
  firstName: string;
  lastName: string;
  avatarURL?: string;
  email: string;
  mobileNumber?: string;
  role: Role;
}

export enum Role {
  BLOCKED = 'blocked',
  MEMBER = 'member',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}
