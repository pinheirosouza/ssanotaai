import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AlertService } from '../../dialogs/alert/alert.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase/firebase.service';
const HTTP_OPTIONS = {
  headers: {
    anotakey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25lY3QiOiJBbm90YSBBSSBlIE1hdXRpYyIsImlhdCI6MTU4NDcyNDg1NH0.h73R3xwzH7Ie_u2DWvJ9axW9z3II0ETbzoBE5d8CsqU',
  },
};

@Injectable({
  providedIn: 'root',
})
export class MoskitService {
  public lastUpdatedStage = 0;
  public lastVideoUpdatedTime = 0;
  public rememberTask = false;
  private url = environment.moskit;

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore,
    private alertService: AlertService,
    private firebaseService: FirebaseService
  ) {}

  setStage(dealId, stage) {
    if (stage > this.lastUpdatedStage) {
      let url = this.url + '/selfservice';
      this.http
        .post(url, { id: dealId, stageid: stage }, HTTP_OPTIONS)
        .subscribe(
          (res) => {
            console.log(res);
            this.lastUpdatedStage = stage;
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  sendRememberSdr(dealId, sdr) {
    if (!this.rememberTask) {
      this.rememberTask = true;
      let url = this.url + '/createtask';
      this.http.post(url, { dealId: dealId, sdr: sdr }, HTTP_OPTIONS).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.rememberTask = false;

          console.log(err);
        }
      );
    }
  }

  writeUserData(name, dataMarcada, dataInicio) {
    this.firebaseService.updateRecord('users', name, {
      name: name,
      dataMarcada: new Date(),
      dataInicio: new Date(),
    });
  }
}
