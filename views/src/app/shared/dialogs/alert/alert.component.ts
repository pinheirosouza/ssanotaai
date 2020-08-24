import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public title: string;
  public description: string

  constructor(private dialog: MatDialogRef<AlertComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.title = data.title;
    this.description = data.description;
  }

  ngOnInit(): void {
  }



  cancel(){
    this.dialog.close()
  }

}
