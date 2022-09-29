import {CallHandler, ExecutionContext, NestInterceptor} from '@nestjs/common';
import {BadRequestException} from '@nestjs/common';
import {Injectable} from '@nestjs/common';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(catchError((err) => throwError(() => new BadRequestException(err.message))));
    }
}
