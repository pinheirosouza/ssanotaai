import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../../dialogs/alert/alert.service';
// import { MarketplaceAuthService } from '../marketplace-auth/marketplace-auth.service';
@Injectable()
export class HTTPStatus {
  private requestInFlight$: BehaviorSubject<boolean>;
  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }
  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }
  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}
@Injectable()
export class HTTPListener implements HttpInterceptor {
  private _requests = 0;
  constructor(
    private status: HTTPStatus,
    private router: Router,
    public alertSevice: AlertService // private auth: MarketplaceAuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    ++this._requests;
    this.status.setHttpStatus(true);
    return next.handle(req).pipe(
      map((event) => {
        return event;
      }),
      catchError((error) => {
        switch (error.status) {
          case 0:
            this.alertSevice.showAlert('Erro', 'Falha na requisição');
          case 400:
            this.alertSevice.showAlert('Erro', 'Requisição inválida');
          case 401:
            this.alertSevice.showAlert('Erro', 'Não autorizado');
          case 403:
            this.alertSevice.showAlert('Erro', 'Execução recusada');
          case 404:
            this.alertSevice.showAlert('Erro', 'Não Encontrado');
          case 408:
            this.alertSevice.showAlert('Erro', 'Tempo de requisição esgotado');
          case 413:
            this.alertSevice.showAlert('Erro', 'Este arquivo é muito grande');
          case 500:
            this.alertSevice.showAlert('Erro', 'Erro interno do Servidor');
          case 501:
            this.alertSevice.showAlert('Erro', 'Não implementado');
          case 502:
            this.alertSevice.showAlert('Erro', 'Bad Gateway');
          case 503:
            this.alertSevice.showAlert('Erro', 'Serviço indisponível');
          // default:
          //   if (this.auth.marketplaceAuthenticationState) {
          //     this.auth.logout();
          //     console.log('Fechando sessão');
          //   }
          //   this.alertSevice.showAlert(
          //     'Erro',
          //     'Tivemos problemas por aqui. Tente novamente mais tarde!'
          //   );
          //   window.location.reload();
        }
        return throwError(error);
      }),
      finalize(() => {
        --this._requests;
        this.status.setHttpStatus(this._requests > 0);
      })
    );
  }
}
