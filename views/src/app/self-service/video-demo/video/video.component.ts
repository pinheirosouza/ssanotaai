import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { VideoService } from './video.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
  public videoUrl = environment.videoUrl;
  public innerWidth;
  constructor(public videoService: VideoService, public elem: ElementRef) {}

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

  jumpVideoTo(time) {
    this.elem.nativeElement.getElementsByClassName(
      'video'
    )[0].currentTime = time;
  }
}
