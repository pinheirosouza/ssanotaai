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
import { MatInputModule } from '@angular/material/input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PlansComponent } from './self-service/plans/plans.component';
import { PlanCardComponent } from './shared/components/plan-card/plan-card.component';
import { ModulesComponent } from './self-service/modules/modules.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingPaymentComponent } from './self-service/loading-payment/loading-payment.component';
import { FormComponent } from './self-service/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IntroFormComponent } from './self-service/intro-form/intro-form.component';
import { AlertComponent } from './shared/dialogs/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { SaleValidators } from './shared/validators/sale';

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
    FormComponent,
    IntroFormComponent,
    AlertComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatChipsModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    MatStepper,
    SaleValidators,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
