import {ApiProperty} from '@nestjs/swagger';
import {UserView} from 'presentation/views/response/user';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-threshold/patient-vital-thresholds.dto';

export class PatientVitalThresholdsView implements PatientVitalThresholdsDto {
    @ApiProperty()
    public minHr: number;

    @ApiProperty()
    public maxHr: number;

    @ApiProperty({nullable: true})
    public hrSetBy: UserView | null;

    @ApiProperty({nullable: true})
    public hrSetAt: number | null;

    @ApiProperty()
    public minTemp: number;

    @ApiProperty()
    public maxTemp: number;

    @ApiProperty({nullable: true})
    public tempSetBy: UserView | null;

    @ApiProperty({nullable: true})
    public tempSetAt: number | null;

    @ApiProperty()
    public minSpo2: number;

    @ApiProperty({nullable: true})
    public spo2SetBy: UserView | null;

    @ApiProperty({nullable: true})
    public spo2SetAt: number | null;

    @ApiProperty()
    public minRr: number;

    @ApiProperty()
    public maxRr: number;

    @ApiProperty({nullable: true})
    public rrSetBy: UserView | null;

    @ApiProperty({nullable: true})
    public rrSetAt: number | null;

    @ApiProperty()
    public minDbp: number;

    @ApiProperty()
    public maxDbp: number;

    @ApiProperty({nullable: true})
    public dbpSetBy: UserView | null;

    @ApiProperty({nullable: true})
    public dbpSetAt: number | null;

    @ApiProperty()
    public minSbp: number;

    @ApiProperty()
    public maxSbp: number;

    @ApiProperty({nullable: true})
    public sbpSetBy: UserView | null;

    @ApiProperty({nullable: true})
    public sbpSetAt: number | null;

    @ApiProperty()
    public minMap: number;

    @ApiProperty()
    public maxMap: number;

    @ApiProperty({nullable: true})
    public mapSetBy: UserView | null;

    @ApiProperty({nullable: true})
    public mapSetAt: number | null;
}
