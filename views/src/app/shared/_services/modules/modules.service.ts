import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  public url = environment.url;
  public modules = [];
  public pageModules;
  public pageName;

  constructor(private http: HttpClient) {
    this.pageModules = {};
    this.pageModules.data = [];
  }

  getModules() {
    let url = this.url + '/noauth/modules';
    this.http.get(url).subscribe((res: any) => {
      console.log(res);
      this.modules = res.info;
    });
  }
}
