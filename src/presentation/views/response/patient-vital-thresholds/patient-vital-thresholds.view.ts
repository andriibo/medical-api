import {ApiProperty} from '@nestjs/swagger';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';

export class PatientVitalThresholdsView implements PatientVitalThresholdsDto {
    @ApiProperty()
    public thresholdsId: string;

    @ApiProperty({default: 0})
    public minHr: number;

    @ApiProperty({default: 0})
    public maxHr: number;

    @ApiProperty({nullable: true})
    public hrSetBy: string | null;

    @ApiProperty({nullable: true})
    public hrSetAt: number | null;

    @ApiProperty({type: Number, multipleOf: 0.1, default: 0})
    public minTemp: number;

    @ApiProperty({type: Number, multipleOf: 0.1, default: 0})
    public maxTemp: number;

    @ApiProperty({nullable: true})
    public tempSetBy: string | null;

    @ApiProperty({nullable: true})
    public tempSetAt: number | null;

    @ApiProperty({default: 0})
    public minSpo2: number;

    @ApiProperty({nullable: true})
    public spo2SetBy: string | null;

    @ApiProperty({nullable: true})
    public spo2SetAt: number | null;

    @ApiProperty({default: 0})
    public minRr: number;

    @ApiProperty({default: 0})
    public maxRr: number;

    @ApiProperty({nullable: true})
    public rrSetBy: string | null;

    @ApiProperty({nullable: true})
    public rrSetAt: number | null;

    @ApiProperty({default: 0})
    public minDbp: number;

    @ApiProperty({default: 0})
    public maxDbp: number;

    @ApiProperty({nullable: true})
    public dbpSetBy: string | null;

    @ApiProperty({nullable: true})
    public dbpSetAt: number | null;

    @ApiProperty({default: 0})
    public minSbp: number;

    @ApiProperty({default: 0})
    public maxSbp: number;

    @ApiProperty({nullable: true})
    public sbpSetBy: string | null;

    @ApiProperty({nullable: true})
    public sbpSetAt: number | null;

    @ApiProperty({default: 0})
    public minMap: number;

    @ApiProperty({default: 0})
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
