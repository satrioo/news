import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs';

import {
  bounceAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    bounceAnimation(),
  ]
})

export class HomeComponent implements OnInit  {
  headline: any[] = [] as any;
  newUser = { name: 'John Doe', email: 'john@example.com' };
  isLoading = true;
  isHeadlineLoading = true;
  isPartialLoading = false;
  error: string | null = null;
  articles: any[] = [];
  displayedArticles: any[] = [];  // For pagination or lazy loading
  pageSize = 8;  // Articles per page
  currentPage = 0;  // Track the current page
  isBrowser = false;
  totalArticle = 0;
  bounce: any;
  dummyArray: number[] = [];
  dummyHeadline: number[] = [];

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.dummyArray = Array(6).fill(0);
    this.dummyHeadline = Array(4).fill(0);
      this.fetchNewsAsync();
      this.fetchHeadline();
  }

  async fetchNewsAsync() {
    const apiUrl = 'everything';
    const params = new HttpParams()
    .set('apiKey', 'f115b1bc9dde45b0b4a8a2fddee5d113')
    .set('q', 'news')

    try {
      this.isLoading = true;

      const data = await this.apiService.get<any>(apiUrl, params).toPromise();
      if (data && data.articles) {
        this.articles = data.articles;
        this.totalArticle = data.articles.length;
        this.loadArticlesInChunks(); // Load the initial chunk of articles
        this.isLoading = false;
      } else {
        this.error = 'No articles available';
      }
    } catch (err) {
      this.error = 'Failed to fetch articles';
    }
  }

  loadArticlesInChunks() {
    this.isPartialLoading = true;

    const nextPageStartIndex = this.currentPage * this.pageSize;
    const nextPageEndIndex = nextPageStartIndex + this.pageSize;

    const nextChunk = this.articles.slice(nextPageStartIndex, nextPageEndIndex);
    this.displayedArticles = [...this.displayedArticles, ...nextChunk];

    this.currentPage++;
    this.isPartialLoading = false;
    this.animate()
  }

  loadMoreArticles() {
    if (!this.isPartialLoading && this.displayedArticles.length < this.articles.length) {
      this.loadArticlesInChunks();
      this.animate()
    }
  }

  fetchHeadline() {
    const apiUrl = 'top-headlines';
    let params = new HttpParams()
    .set('apiKey', 'f115b1bc9dde45b0b4a8a2fddee5d113')
    .set('sources', 'bbc-news')

    this.apiService.get<any>(apiUrl, params).pipe(
      map(response => response.articles)
    ).subscribe({
      next: (data) => {
        this.headline = data;
        this.isHeadlineLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isHeadlineLoading = false;
      },
    });
  }

  animationState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }
}
