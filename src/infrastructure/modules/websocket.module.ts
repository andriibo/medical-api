import {Module} from '@nestjs/common';
import {VitalsGateway} from 'presentation/gateways/vitals.gateway';
import {AuthModule} from 'infrastructure/modules/auth.module';

@Module({
    imports: [AuthModule],
    providers: [VitalsGateway],
})
export class WebsocketModule {}
