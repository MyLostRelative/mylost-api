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
}
