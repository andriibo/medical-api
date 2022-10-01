import {Controller, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Roles} from 'presentation/guards';

@Controller()
@ApiBearerAuth()
@ApiTags('Patient')
export class PatientController {
    @Get('patient')
    @Roles('Patient')
    public getDoctors(): [] {
        return [];
    }
}
