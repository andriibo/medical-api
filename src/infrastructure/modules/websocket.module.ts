import {Module} from '@nestjs/common';
import {VitalsGateway} from 'presentation/gateways/vitals.gateway';

@Module({
    providers: [VitalsGateway],
})
export class WebsocketModule {}
