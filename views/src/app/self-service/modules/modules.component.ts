import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/shared/_services/modules/modules.service';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/shared/_services/sales/sales.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  constructor(
    public modulesService: ModulesService,
    public salesService: SalesService,
    private router: Router
  ) {
    this.modulesService.getModules();
  }

  ngOnInit(): void {}

  moduleCheck(m) {
    if (m.isChecked) {
      m.isChecked = false;
    } else {
      m.isChecked = true;
    }
  }

  back() {
    this.router.navigate(['plans']);
  }

  next() {
    let modulesList = [];
    for (let i = 0; i < this.modulesService.modules.length; i++) {
      if (this.modulesService.modules[i].isChecked) {
        modulesList.push({
          id: this.modulesService.modules[i]._id,
          value: this.modulesService.modules[i].value,
        });
      }
    }
    this.salesService.sale.modulesArray = modulesList;
    this.salesService.sale.max_parcel = 12;
    this.salesService.sale.membershipFee = 200;
    console.log('Venda final', this.salesService.sale);
    this.salesService.createSale().subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['loading-payment']);
  }
}
