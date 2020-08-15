import { Component, OnInit, HostListener } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { VideoService } from './video/video.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-video-demo',
  templateUrl: './video-demo.component.html',
  styleUrls: ['./video-demo.component.scss'],
})
export class VideoDemoComponent implements OnInit {
  public icon = 'home';
  public innerWidth;

  constructor(
    private matStepper: MatStepper,
    private videoService: VideoService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {}

  selectionChange(event) {
    console.log(event);
    if (event.selectedIndex == 0) {
      this.icon = 'home';
    } else if (event.selectedIndex == 1) {
      this.icon = 'movie';
    } else if (event.selectedIndex == 2) {
      this.icon = 'add_shopping_cart';
    }
  }

  checkVideoStatus(matStepper) {
    if (this.videoService.currentTime > 570) {
      matStepper.next();
    } else {
      this.snackbar.open(
        'Assista o vídeo até o final para continuar',
        'Fechar',
        {
          duration: 3000,
        }
      );
    }
  }

  next() {
    this.router.navigate(['plans']);
  }
}
