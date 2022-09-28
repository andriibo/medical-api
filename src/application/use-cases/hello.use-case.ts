import {Injectable} from '@nestjs/common';

@Injectable()
export class HelloUseCase {
    getHello(): string {
        return 'Hello World!';
    }
}
