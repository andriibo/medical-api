import {ApiProperty} from '@nestjs/swagger';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';

export class PatientVitalThresholdsView implements PatientVitalThresholdsDto {
    @ApiProperty()
    public thresholdsId: string;

    @ApiProperty()
    public minHr: number;

    @ApiProperty()
    public maxHr: number;

    @ApiProperty({nullable: true})
    public hrSetBy: string | null;

    @ApiProperty({nullable: true})
    public hrSetAt: number | null;

    @ApiProperty({multipleOf: 0.1})
    public minTemp: number;

    @ApiProperty({multipleOf: 0.1})
    public maxTemp: number;

    @ApiProperty({nullable: true})
    public tempSetBy: string | null;

    @ApiProperty({nullable: true})
    public tempSetAt: number | null;

    @ApiProperty()
    public minSpo2: number;

    @ApiProperty({nullable: true})
    public spo2SetBy: string | null;

    @ApiProperty({nullable: true})
    public spo2SetAt: number | null;

    @ApiProperty()
    public minRr: number;

    @ApiProperty()
    public maxRr: number;

    @ApiProperty({nullable: true})
    public rrSetBy: string | null;

    @ApiProperty({nullable: true})
    public rrSetAt: number | null;

    @ApiProperty()
    public minDbp: number;

    @ApiProperty()
    public maxDbp: number;

    @ApiProperty({nullable: true})
    public dbpSetBy: string | null;

    @ApiProperty({nullable: true})
    public dbpSetAt: number | null;

    @ApiProperty()
    public minSbp: number;

    @ApiProperty()
    public maxSbp: number;

    @ApiProperty({nullable: true})
    public sbpSetBy: string | null;

    @ApiProperty({nullable: true})
    public sbpSetAt: number | null;

    @ApiProperty()
    public minMap: number;

    @ApiProperty()
    public maxMap: number;

    @ApiProperty({nullable: true})
    public mapSetBy: string | null;

    @ApiProperty({nullable: true})
    public mapSetAt: number | null;

    @ApiProperty()
    public createdAt: number;

    @ApiProperty()
    public isPending: boolean;
}
