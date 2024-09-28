import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { DetailAccountComponent } from './sub-pages/detail-account/detail-account.component';

const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: 'detail/:id', component: DetailAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
