import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  currentTime: number;

  constructor() {}

  setCurrentTime(data) {
    this.currentTime = data.target.currentTime;
    console.log(this.currentTime);
  }
}
