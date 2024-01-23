import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class authInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        request.jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFmYTE0OTk0MDQ4Y2JiMmU4OWM1OWQiLCJ1c2VyTmFtZSI6ImFheXVzaCIsIlJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA2MDA5MDU2LCJleHAiOjE3MDYyNjgyNTZ9.ZhwFH6bxigNSAbHjUDxikXWVqfH6cS55lWemu52DPNY";
        return next.handle();
    }
}