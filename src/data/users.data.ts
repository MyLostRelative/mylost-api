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
    username: 'srazi',
    password: '1234srazi',
    firstName: 'სუ­მენ­ჯი',
    lastName: 'რა­ზი­კაშ­ვი­ლი',
    email: 'srazi60@gmail.com',
    mobileNumber: '+995 598 60 95 09',
    role: Role.MEMBER,
  },
  {
    username: 'nairaW',
    password: 'nairaW1234',
    firstName: 'ნაირა',
    lastName: 'ჭა­ფან­ძე',
    email: 'nairaW84@gmail.com',
    mobileNumber: '+995 593 39 48 16',
    role: Role.MEMBER,
  },
];
