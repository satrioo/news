import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { DetailAccountComponent } from './sub-pages/detail-account/detail-account.component';


@NgModule({
  declarations: [
    AccountComponent,
    DetailAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
