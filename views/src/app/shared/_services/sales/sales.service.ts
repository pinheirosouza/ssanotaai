import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sale } from '../../interfaces/sale';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  public url = environment.url;
  public sale: Sale = {};

  constructor(private http: HttpClient) {}

  createSale() {
    let url = this.url + '/noauth/ssanotaai/ssroutine';
    return this.http.post(url, this.sale);
  }
}
