import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/shared/_services/modules/modules.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit {
  constructor(public modulesService: ModulesService) {
    this.modulesService.getModules();
  }

  ngOnInit(): void {}

  public columns() {
    return Math.trunc((window.innerWidth - 260) / 280);
  }
  public gridTile() {
    let col = Math.trunc((window.innerWidth - 260) / 280);
    let row = Math.trunc((window.innerWidth - 260) / 280);
    return col + ':' + row;
  }
}
