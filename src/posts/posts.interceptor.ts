import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class PostInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        return next.handle()
    }
}