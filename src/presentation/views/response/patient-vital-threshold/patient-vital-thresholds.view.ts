import {ApiProperty} from '@nestjs/swagger';
import {UserView} from 'presentation/views/response/user';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-threshold/patient-vital-thresholds.dto';

export class PatientVitalThresholdsView implements PatientVitalThresholdsDto {
    @ApiProperty()
    public minHr: number;

    @ApiProperty()
    public maxHr: number;

    @ApiProperty()
    public hrSetBy?: UserView;

    @ApiProperty()
    public hrSetAt?: number;

    @ApiProperty()
    public minTemp: number;

    @ApiProperty()
    public maxTemp: number;

    @ApiProperty()
    public tempSetBy?: UserView;

    @ApiProperty()
    public tempSetAt?: number;

    @ApiProperty()
    public minSpo2: number;

    @ApiProperty()
    public spo2SetBy?: UserView;

    @ApiProperty()
    public spo2SetAt?: number;

    @ApiProperty()
    public minRr: number;

    @ApiProperty()
    public maxRr: number;

    @ApiProperty()
    public rrSetBy?: UserView;

    @ApiProperty()
    public rrSetAt?: number;

    @ApiProperty()
    public minDbp: number;

    @ApiProperty()
    public maxDbp: number;

    @ApiProperty()
    public dbpSetBy?: UserView;

    @ApiProperty()
    public dbpSetAt?: number;

    @ApiProperty()
    public minSbp: number;

    @ApiProperty()
    public maxSbp: number;

    @ApiProperty()
    public sbpSetBy?: UserView;

    @ApiProperty()
    public sbpSetAt?: number;

    @ApiProperty()
    public minMap: number;

    @ApiProperty()
    public maxMap: number;

    @ApiProperty()
    public mapSetBy?: UserView;
}
