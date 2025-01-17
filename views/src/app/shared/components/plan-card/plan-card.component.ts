import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
})
export class PlanCardComponent implements OnInit {
  public mensal;
  @Input('title') title: String;
  @Input('description') description: Array<String>;
  @Input('mat_icon') mat_icon: String;
  @Input('price') price: number;
  @Input('period') period: number;

  constructor() {}

  ngOnInit(): void {
    this.mensal = (this.price / this.period).toFixed(2);
  }
}
