import { Gender, RelationType, BloodType } from 'src/models/ad';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdInfoDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty()
  gender?: Gender;

  @ApiProperty()
  @IsString()
  city?: string;

  @ApiProperty()
  relationType?: RelationType;

  @ApiProperty()
  bloodType?: BloodType;
}
