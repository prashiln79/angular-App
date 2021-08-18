import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { SocialAuthService } from 'angularx-social-login';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/internal/operators/catchError';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {

    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(request).pipe(catchError(error => {
            return this.handleResponseError(error, request, next);
        }));
    }


    
    handleResponseError(error, request?, next?) {
      
        // Invalid token error
         if (error.status === 401) {
            this.auth.signOut();
        }

        // Access denied error
        else if (error.status === 403) {
            // Show message
            // Logout
            this.auth.signOut();
        }
        // Server error
        else if (error.status === 500) {
            // Show message
        }

        // Maintenance error
        else if (error.status === 503) {
            // Show message
            // Redirect to the maintenance page
        }

        return throwError(error);
    }
}