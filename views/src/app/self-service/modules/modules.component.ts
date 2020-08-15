import { Component, OnInit, HostListener } from '@angular/core';
import { ModulesService } from 'src/app/shared/_services/modules/modules.service';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/shared/_services/sales/sales.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  public innerWidth;
  constructor(
    public modulesService: ModulesService,
    public salesService: SalesService,
    private router: Router
  ) {
    this.modulesService.getModules();
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
    this.router.navigate(['intro-form']);
  }
}
