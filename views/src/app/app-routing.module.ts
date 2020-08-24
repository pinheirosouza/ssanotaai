import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoDemoComponent } from './self-service/video-demo/video-demo.component';
import { PlansComponent } from './self-service/plans/plans.component';
import { ModulesComponent } from './self-service/modules/modules.component';
import { LoadingPaymentComponent } from './self-service/loading-payment/loading-payment.component';
import { FormComponent } from './self-service/form/form.component';
import { IntroFormComponent } from './self-service/intro-form/intro-form.component';

const routes: Routes = [
  {
    path: 'plans',
    component: PlansComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'intro-form',
    component: IntroFormComponent,
  },
  {
    path: 'modules',
    component: ModulesComponent,
  },
  {
    path: 'loading-payment',
    component: LoadingPaymentComponent,
  },
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
