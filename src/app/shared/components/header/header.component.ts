import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Fixed typo here
})
export class HeaderComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, // Renamed from 'route' to 'router'
    private activatedRoute: ActivatedRoute // Added ActivatedRoute
  ) {}
  currentPath = ''

  ngOnInit() {
    // Get the current full route path
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentPath = event.urlAfterRedirects;
      });
  }

  navigateToPage(page: string): void {
    this.router.navigate([page]);
  }
}
