import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(
    private readonly _loadingService: LoadingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    // if (this._accountService.isLoggedIn) {
    //   req = req.clone({
    //     setHeaders: {
    //       'Authorization': this._accountService.accessToken,
    //     }
    //   });
    // }

    this._loadingService.setLoad(true);
    document.body.classList.add('busy-cursor');

    return next.handle(req)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this._loadingService.setLoad(false);
          document.body.classList.remove('busy-cursor');
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    // if (error.status === 401 && localStorage.getItem(settings.authKey)) {
    //   localStorage.clear();
    //   alert('Unauthorized access! Please login again.');
    //   window.location.reload(true);
    // }

    if (error.status === 401) {
      localStorage.clear();
      alert('Unauthorized access! Please login again.');
      window.location.reload(true);
    }

    return throwError(error);
  }

}
