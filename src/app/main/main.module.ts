import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MainComponent} from './main.component';
import {AlertComponent} from './alert/alert.component';
import {TimeTableComponent} from './time-table/time-table.component';
import {MainRoutingModule} from './main-routing.module';
import {AutoCloseDirective} from './auto.close.directive';
import {AppComponentEventEmitterService} from './event-emmiter.service';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {ChangePasswordComponent} from './change-password/change-password.component';
import { MessageModalComponent } from './message-modal/message-modal.component';
import { OrderByPipe } from './shared/order-by.pipe';


@NgModule({
  declarations: [
    MainComponent,
    AlertComponent,
    TimeTableComponent,
    AutoCloseDirective,
    ChangePasswordComponent,
    MessageModalComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ChartsModule,
    FormsModule
  ],
  providers: [AppComponentEventEmitterService]
})
export class MainModule { }
