import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'news',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./pages/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: '',
    redirectTo: '/news', // Optional: Redirect to home on root
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/news', // Optional: Wildcard route
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
