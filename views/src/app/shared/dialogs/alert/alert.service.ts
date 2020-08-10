import { AlertComponent } from 'src/app/shared/dialogs/alert/alert.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }

  showAlert(title, description){
    this.dialog.open(AlertComponent, {data: {
      title: title,
      description: description
    }})
  }
}
