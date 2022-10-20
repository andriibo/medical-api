import {ApiProperty} from '@nestjs/swagger';
import {SyncVitalsDto, VitalDto} from 'domain/dtos/response/vital';

export class SyncVitalsView extends SyncVitalsDto {
    @ApiProperty()
    public vitals: VitalView[] = [];
}

export class VitalView extends VitalDto {
    @ApiProperty()
    public temperature: number;

    @ApiProperty()
    public hr: number;

    @ApiProperty()
    public spo: number;

    @ApiProperty()
    public rr: number;

    @ApiProperty()
    public fall: boolean;

    @ApiProperty()
    public timestamp: number;
}
