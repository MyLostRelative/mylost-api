import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot()
  ],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
