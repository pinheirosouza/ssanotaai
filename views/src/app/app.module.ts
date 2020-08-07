import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideoDemoComponent } from './self-service/video-demo/video-demo.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IntroComponent } from './self-service/video-demo/intro/intro.component';
import { VideoComponent } from './self-service/video-demo/video/video.component';
import { FinishComponent } from './self-service/video-demo/finish/finish.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PlansComponent } from './self-service/plans/plans.component';
import { PlanCardComponent } from './shared/components/plan-card/plan-card.component';
import { ModulesComponent } from './self-service/modules/modules.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingPaymentComponent } from './self-service/loading-payment/loading-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoDemoComponent,
    IntroComponent,
    VideoComponent,
    FinishComponent,
    PlansComponent,
    PlanCardComponent,
    ModulesComponent,
    LoadingPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatChipsModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    MatStepper,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
