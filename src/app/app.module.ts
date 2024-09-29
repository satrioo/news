import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ApiService } from './services/api.service';
import { HeadlineModule } from './shared/components/headline/headline.module';
import { CategoryModule } from './pages/category/category.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, HttpClientJsonpModule, HeadlineModule, CategoryModule  ],
  providers: [provideClientHydration(), ApiService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
