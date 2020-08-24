import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-loading-payment',
  templateUrl: './loading-payment.component.html',
  styleUrls: ['./loading-payment.component.scss'],
})
export class LoadingPaymentComponent implements OnInit {
  public innerWidth;
  constructor() {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
}
