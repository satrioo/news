import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent implements OnInit {
  category = ['News', 'Technology', 'Sports', 'Celebrity', 'Music', 'Movie', 'Comedy']
  selectedCategory = 'Technology'
  articles: any[] = [] as any;
  isLoading = true;
  isBrowser = false;
  error: string | null = null;
  dummyArray: number[] = [];

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) {}

  selectCategory(item: string) {
    this.selectedCategory = item;
    this.fetchCategory()
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.dummyArray = Array(6).fill(0);
    if (this.isBrowser) {
      this.fetchCategory()
    } else {
      this.isLoading = false;
    }
  }

  fetchCategory() {
    const apiUrl = 'https://newsapi.org/v2/everything';  // Replace with your actual API URL
    let params = new HttpParams()
    .set('apiKey', '6d203f0cddc542e0a9e0c47de325158c')
    .set('q', this.selectedCategory)

    this.apiService.get<any>(apiUrl, params).pipe(
      map(response => response.articles)
    ).subscribe({
      next: (data) => {
        this.articles = data;  // Assign the `docs` to `users`
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
}
