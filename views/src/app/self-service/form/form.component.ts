import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/shared/_services/sales/sales.service';
import { SaleValidators } from 'src/app/shared/validators/sale';
import { AlertService } from 'src/app/shared/dialogs/alert/alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(
    public router: Router,
    public salesService: SalesService,
    public saleVal: SaleValidators,
    private alertService: AlertService
  ) {
    this.salesService.sale.address = {};
  }

  ngOnInit(): void {}

  back() {
    this.router.navigate(['video-demo']);
  }
  next() {
    if (
      this.saleVal.pageNameFormControl.invalid ||
      this.saleVal.cpfCnpjFormControl.invalid ||
      this.saleVal.nameFormControl.invalid ||
      this.saleVal.cpfFormControl.invalid ||
      this.saleVal.birthDateFormControl.invalid ||
      this.saleVal.phoneFormControl.invalid ||
      this.saleVal.postalCodeFormControl.invalid ||
      this.saleVal.streetFormControl.invalid ||
      this.saleVal.numberFormControl.invalid ||
      this.saleVal.districtFormControl.invalid ||
      this.saleVal.cityFormControl.invalid ||
      this.saleVal.stateFormControl.invalid
    ) {
      this.alertService.showAlert('Erro', 'Complete os campos corretamente');
    } else {
      console.log(this.salesService.sale);
      this.router.navigate(['plans']);
    }
  }
}