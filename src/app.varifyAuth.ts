import { Headers, Injectable } from "@nestjs/common";

@Injectable()
export class AuthVerify{
    validate(@Headers() headers:any):boolean{
        console.log("from post" , headers);
        return true;
    }
}