import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse,
} from '@angular/common/http';
import {Observable, BehaviorSubject, EMPTY, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, filter, finalize, switchMap, take, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public injector: Injector,
    private router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({url: request.url + '?key=' + environment.firebase.apiKey});
    return next.handle(request);
  }
}
