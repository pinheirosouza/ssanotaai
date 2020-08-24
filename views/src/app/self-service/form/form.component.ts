import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/shared/_services/sales/sales.service';
import { SaleValidators } from 'src/app/shared/validators/sale';
import { AlertService } from 'src/app/shared/dialogs/alert/alert.service';
import { GetAddressByCepService } from 'src/app/shared/_services/getAddressByCep/get-address-by-cep.service';
import { ModulesService } from 'src/app/shared/_services/modules/modules.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public innerWidth;

  constructor(
    public router: Router,
    public salesService: SalesService,
    public saleVal: SaleValidators,
    private alertService: AlertService,
    private getAddressService: GetAddressByCepService,
    private modulesService: ModulesService
  ) {
    this.salesService.sale.address = {};
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  layoutStyle() {
    if (innerWidth > 1000) {
      return 'row';
    } else {
      return 'column';
    }
  }

  getAddress() {
    this.getAddressService
      .getAddressByCep(this.salesService.sale.address.postalCode)
      .then((res: any) => {
        res.json().then((res) => {
          this.salesService.sale.address.street = res.logradouro;
          this.salesService.sale.address.city = res.localidade;
          this.salesService.sale.address.district = res.bairro;
          this.salesService.sale.address.state = this.getAddressService.ufToState(
            res.uf
          );
        });
      });
  }

  back() {
    this.router.navigate(['modules']);
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
      let modulesList = [];
      for (let i = 0; i < this.modulesService.modules.length; i++) {
        if (this.modulesService.modules[i].isChecked) {
          modulesList.push({
            module: this.modulesService.modules[i]._id,
            value: this.modulesService.modules[i].base_price,
          });
        }
      }
      this.salesService.sale.modulesArray = modulesList;
      this.salesService.sale.max_parcel = 12;
      this.salesService.sale.membershipFee = 200;
      console.log('Venda final', this.salesService.sale);
      this.salesService.createSale().subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          window.open(res.info.link, '_self');
          // window.open(
          //   'https://pagamento.anota.ai/payment/5f3702fe068acd002493ccc6',
          //   '_self'
          // );
        } else {
          this.alertService.showAlert('Erro', res.message);
        }
      });
      this.router.navigate(['loading-payment']);
      console.log(this.salesService.sale);
    }
  }
}
