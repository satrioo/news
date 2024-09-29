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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactModule } from './pages/contact/contact.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, HttpClientJsonpModule, HeadlineModule, CategoryModule, BrowserAnimationsModule, ContactModule  ],
  providers: [provideClientHydration(), ApiService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
