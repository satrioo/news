import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {

  Inject,

  PLATFORM_ID,

} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: Router
  ) {}

  navigateToPage(page: string): void {
    this.route.navigate([page]);
  }
}
