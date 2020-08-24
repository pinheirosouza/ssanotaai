import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  public url = environment.url;
  public modules = [];

  constructor(private http: HttpClient) {}

  getModules() {
    let url = this.url + '/noauth/ssanotaai/listmodules';
    this.http.get(url).subscribe((res: any) => {
      this.modules = res.info;
      for (let i = 0; i < this.modules.length; i++) {
        this.modules[i].isChecked = false;
        console.log(this.modules[i]);
      }
      console.log(this.modules);
    });
  }
}
