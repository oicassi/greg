import {
  HttpEvent, HttpHandler,

  HttpInterceptor, HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as jwt_decode from 'jwt-decode';
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/core/_services";
import { TokenService } from './../_services/token.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
              private authenticationService: AuthenticationService,
              private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let token = this.tokenService.getToken();
    console.log(request);
    console.log(next);
    
    if (request.url.includes('localhost')){
      if(token){
        request = request.clone({
          setHeaders: {
            Authorization: `${token}`,
          },
        });
      }
    }
    
    return next.handle(request);
  }
}
