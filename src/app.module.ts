import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {CatsController} from './cats.controller';
import {MoviesController} from './movies.controller';
import {AppService} from './app.service';

@Module({
    imports: [],
    controllers: [AppController, CatsController, MoviesController],
    providers: [AppService],
})
export class AppModule {
}
