import {Controller, Get} from '@nestjs/common';
import {AppService, Movie} from './app.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getMovies(): Movie[] {
        return this.appService.getMovies();
    }
}
