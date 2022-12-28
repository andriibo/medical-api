import {ApiProperty} from '@nestjs/swagger';
import {UserView} from 'presentation/views/response/user';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-threshold/patient-vital-thresholds.dto';

export class PatientVitalThresholdsView implements PatientVitalThresholdsDto {
    @ApiProperty()
    public minHr: number;

    @ApiProperty()
    public maxHr: number;

    @ApiProperty({nullable: true})
    public hrSetBy?: UserView;

    @ApiProperty({nullable: true})
    public hrSetAt?: number;

    @ApiProperty()
    public minTemp: number;

    @ApiProperty()
    public maxTemp: number;

    @ApiProperty({nullable: true})
    public tempSetBy?: UserView;

    @ApiProperty({nullable: true})
    public tempSetAt?: number;

    @ApiProperty()
    public minSpo2: number;

    @ApiProperty({nullable: true})
    public spo2SetBy?: UserView;

    @ApiProperty({nullable: true})
    public spo2SetAt?: number;

    @ApiProperty()
    public minRr: number;

    @ApiProperty()
    public maxRr: number;

    @ApiProperty({nullable: true})
    public rrSetBy?: UserView;

    @ApiProperty({nullable: true})
    public rrSetAt?: number;

    @ApiProperty()
    public minDbp: number;

    @ApiProperty()
    public maxDbp: number;

    @ApiProperty({nullable: true})
    public dbpSetBy?: UserView;

    @ApiProperty({nullable: true})
    public dbpSetAt?: number;

    @ApiProperty()
    public minSbp: number;

    @ApiProperty()
    public maxSbp: number;

    @ApiProperty({nullable: true})
    public sbpSetBy?: UserView;

    @ApiProperty({nullable: true})
    public sbpSetAt?: number;

    @ApiProperty()
    public minMap: number;

    @ApiProperty()
    public maxMap: number;

    @ApiProperty({nullable: true})
    public mapSetBy?: UserView;

    @ApiProperty({nullable: true})
    public mapSetAt?: number;
}
