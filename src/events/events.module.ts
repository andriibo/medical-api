import {Module} from '@nestjs/common';
import {AppGateway} from './app.gateway';
import {EventsGateway} from './events.gateway';

@Module({
    providers: [AppGateway],
})
export class EventsModule {}
