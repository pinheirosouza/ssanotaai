import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansService } from '../../shared/_services/plans/plans.service';
import { SalesService } from '../../shared/_services/sales/sales.service';
import { AlertService } from '../../shared/dialogs/alert/alert.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  public selectedPlan;

  constructor(
    public router: Router,
    public plansService: PlansService,
    private salesService: SalesService,
    private alertService: AlertService
  ) {
    plansService.getPlans();
  }

  ngOnInit(): void {}

  selectPlan(p) {
    console.log(p);
    for (let i = 0; i < this.plansService.plans.length; i++) {
      this.plansService.plans[i].isChecked = false;
    }
    p.isChecked = true;
    this.selectedPlan = p;
  }

  back() {
    this.router.navigate(['form']);
  }
  next() {
    if (this.selectedPlan) {
      this.salesService.sale.plan_id = this.selectedPlan._id;
      this.salesService.sale.max_parcel = this.selectedPlan.period;
      console.log(this.salesService.sale);
      this.router.navigate(['modules']);
    } else {
      this.alertService.showAlert(
        'Atenção',
        'Selecione um plano para continuar'
      );
    }
  }
}