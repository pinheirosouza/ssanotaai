import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  public url = environment.url;
  public plans = [];

  constructor(private http: HttpClient) {}

  getPlans() {
    let url = this.url + '/noauth/ssanotaai/listplans';
    this.http.get(url).subscribe((res: any) => {
      this.plans = res.info;
      for (let i = 0; i < this.plans.length; i++) {
        this.plans[i].isChecked = false;
        console.log(this.plans[i]);
      }
      console.log(this.plans);
    });
  }
}
