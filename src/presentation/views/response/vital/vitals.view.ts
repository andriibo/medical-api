import {ApiProperty} from '@nestjs/swagger';
import {VitalsDto, VitalDto} from 'domain/dtos/response/vital';
import {PatientVitalThresholdsView} from 'views/response/patient-vital-thresholds/patient-vital-thresholds.view';

export class VitalView extends VitalDto {
    @ApiProperty({nullable: true})
    public temp: number | null;

    @ApiProperty({nullable: true})
    public isTempNormal: boolean | null;

    @ApiProperty({nullable: true})
    public hr: number | null;

    @ApiProperty({nullable: true})
    public isHrNormal: boolean | null;

    @ApiProperty({nullable: true})
    public spo2: number | null;

    @ApiProperty({nullable: true})
    public isSpo2Normal: boolean | null;

    @ApiProperty({nullable: true})
    public rr: number | null;

    @ApiProperty({nullable: true})
    public isRrNormal: boolean | null;

    @ApiProperty({nullable: true})
    public fall: boolean | null;

    @ApiProperty()
    public timestamp: number;

    @ApiProperty()
    public thresholdsId: string;
}

export class VitalsView extends VitalsDto {
    @ApiProperty()
    public vitals: VitalView[] = [];

    @ApiProperty()
    public thresholds: PatientVitalThresholdsView[] = [];
}
