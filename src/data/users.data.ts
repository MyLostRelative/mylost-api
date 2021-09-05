import { UserInfoDTO } from 'src/dto/user-info.dto';
import { Role } from 'src/models/user';

export const users: UserInfoDTO[] = [
  {
    username: 'ijiki',
    password: '1234iuri',
    firstName: 'iuri',
    lastName: 'jikidze',
    email: 'ijiki16@gmail.com',
    mobileNumber: '+1 123 456 789',
    role: Role.ADMIN,
  },
  {
    username: 'gelaia',
    password: '1234gela',
    firstName: 'gela',
    lastName: 'gabisonia',
    email: 'gelaia@gmail.com',
    mobileNumber: '+1 123 456 789',
    role: Role.MODERATOR,
  },
  {
    username: 'amanda123',
    password: 'amanda123',
    firstName: 'amanda',
    lastName: 'cerny',
    email: 'amanda123cerny@gmail.com',
    mobileNumber: '+1 123 456 789',
    role: Role.ADMIN,
  },
  {
    username: 'nat',
    password: '1234nat',
    firstName: 'nat',
    lastName: 'tan',
    email: 'nat@gmail.com',
    mobileNumber: '+1 123 456 789',
    role: Role.MEMBER,
  },
];
