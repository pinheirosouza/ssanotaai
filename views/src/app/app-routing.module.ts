import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoDemoComponent } from './self-service/video-demo/video-demo.component';

const routes: Routes = [
  {
    path: 'video-demo',
    component: VideoDemoComponent,
  },
  {
    path: '',
    redirectTo: 'video-demo',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
