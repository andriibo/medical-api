import {ApiProperty} from '@nestjs/swagger';
import {SyncVitalsDto} from 'domain/dtos/response/vital';
import {VitalView} from './sync-vital.view';

export class GetVitalsView extends SyncVitalsDto {
    @ApiProperty()
    public vitals: VitalView[] = [];
}
