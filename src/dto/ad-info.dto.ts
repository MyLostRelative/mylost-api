import { Gender, RelationType, BloodType } from 'src/models/ad';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdInfoDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userID: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  gender?: Gender;

  @ApiPropertyOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsEnum(RelationType)
  relationType?: RelationType;

  @ApiPropertyOptional()
  @IsEnum(BloodType)
  bloodType?: BloodType;

  @ApiPropertyOptional()
  @IsNumber()
  age?: number;
}

export class AdSearchDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(64)
  @IsString()
  query?: string | null = null;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @IsEnum(JobState)
  // state: JobState | null = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender | null = null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string | null = null;

  @ApiPropertyOptional()
  @IsEnum(RelationType)
  relationType?: RelationType;

  @ApiPropertyOptional()
  @IsEnum(BloodType)
  bloodType?: BloodType;

  @ApiPropertyOptional()
  @IsNumber()
  fromAge?: number;

  @ApiPropertyOptional()
  @IsNumber()
  toAge?: number;
}
