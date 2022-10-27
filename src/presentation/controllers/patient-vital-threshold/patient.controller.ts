import {Controller} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@Controller('patient')
@ApiBearerAuth()
@ApiTags('Patient Vital Threshold')
export class PatientController {}
