import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-form',
  templateUrl: './intro-form.component.html',
  styleUrls: ['./intro-form.component.scss'],
})
export class IntroFormComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['form']);
    }, 5000);
  }
}
