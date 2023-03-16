import {ApiProperty} from '@nestjs/swagger';
import {PatientVitalThresholdsDto} from 'domain/dtos/response/patient-vital-thresholds/patient-vital-thresholds.dto';
import {
    MaxDBP,
    MaxMAP,
    MaxRR,
    MaxSBP,
    MaxSpO2,
    MaxTemp,
    MinDBP,
    MinMAP,
    MinRR,
    MinSBP,
    MinSpO2,
    MinTemp,
} from 'domain/constants/thresholds.const';

export class PatientVitalThresholdsView implements PatientVitalThresholdsDto {
    @ApiProperty()
    public thresholdsId: string;

    @ApiProperty({minimum: MinRR, maximum: MaxRR})
    public minHr: number;

    @ApiProperty({minimum: MinRR, maximum: MaxRR})
    public maxHr: number;

    @ApiProperty({nullable: true})
    public hrSetBy: string | null;

    @ApiProperty({nullable: true})
    public hrSetAt: number | null;

    @ApiProperty({minimum: MinTemp, maximum: MaxTemp, multipleOf: 0.1})
    public minTemp: number;

    @ApiProperty({minimum: MinTemp, maximum: MaxTemp, multipleOf: 0.1})
    public maxTemp: number;

    @ApiProperty({nullable: true})
    public tempSetBy: string | null;

    @ApiProperty({nullable: true})
    public tempSetAt: number | null;

    @ApiProperty({minimum: MinSpO2, maximum: MaxSpO2})
    public minSpo2: number;

    @ApiProperty({nullable: true})
    public spo2SetBy: string | null;

    @ApiProperty({nullable: true})
    public spo2SetAt: number | null;

    @ApiProperty({minimum: MinRR, maximum: MaxRR})
    public minRr: number;

    @ApiProperty({minimum: MinRR, maximum: MaxRR})
    public maxRr: number;

    @ApiProperty({nullable: true})
    public rrSetBy: string | null;

    @ApiProperty({nullable: true})
    public rrSetAt: number | null;

    @ApiProperty({minimum: MinDBP, maximum: MaxDBP})
    public minDbp: number;

    @ApiProperty({minimum: MinDBP, maximum: MaxDBP})
    public maxDbp: number;

    @ApiProperty({nullable: true})
    public dbpSetBy: string | null;

    @ApiProperty({nullable: true})
    public dbpSetAt: number | null;

    @ApiProperty({minimum: MinSBP, maximum: MaxSBP})
    public minSbp: number;

    @ApiProperty({minimum: MinSBP, maximum: MaxSBP})
    public maxSbp: number;

    @ApiProperty({nullable: true})
    public sbpSetBy: string | null;

    @ApiProperty({nullable: true})
    public sbpSetAt: number | null;

    @ApiProperty({minimum: MinMAP, maximum: MaxMAP})
    public minMap: number;

    @ApiProperty({minimum: MinMAP, maximum: MaxMAP})
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
