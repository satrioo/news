import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { HeadlineComponent  } from './components/headline/headline.component';

@NgModule({
  declarations: [HeadlineComponent, FooterComponent, HeaderComponent, CardComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [HeadlineComponent, FooterComponent, HeaderComponent, CardComponent],
})
export class SharedModule {}
