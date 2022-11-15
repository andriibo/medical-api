import {Module} from '@nestjs/common';
import {VitalsGateway} from 'presentation/gateways/vitals.gateway';
import {AuthModule, PatientDataAccessModule} from 'infrastructure/modules';

@Module({
    imports: [AuthModule, PatientDataAccessModule],
    providers: [VitalsGateway],
})
export class WebsocketModule {}
