import {ApiProperty} from '@nestjs/swagger';
import {VitalsDto, VitalDto} from 'domain/dtos/response/vital';

export class VitalView extends VitalDto {
    @ApiProperty()
    public temp: number | null;

    @ApiProperty()
    public isTempNormal: boolean | null;

    @ApiProperty()
    public hr: number | null;

    @ApiProperty()
    public isHrNormal: boolean | null;

    @ApiProperty()
    public spo2: number | null;

    @ApiProperty()
    public isSpo2Normal: boolean | null;

    @ApiProperty()
    public rr: number | null;

    @ApiProperty()
    public isRrNormal: boolean | null;

    @ApiProperty()
    public fall: boolean | null;

    @ApiProperty()
    public timestamp: number;

    @ApiProperty()
    public thresholdsId: string;
}

export class VitalsView extends VitalsDto {
    @ApiProperty()
    public vitals: VitalView[] = [];
}
