import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';

@Module({
  providers: [PlaceService],
  controllers: [PlaceController]
})
export class PlaceModule {}
