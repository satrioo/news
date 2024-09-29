import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit  {
  headline: any[] = [] as any;
  newUser = { name: 'John Doe', email: 'john@example.com' };
  isLoading = true;
  isPartialLoading = false;
  error: string | null = null;
  articles: any[] = [];
  displayedArticles: any[] = [];  // For pagination or lazy loading
  pageSize = 8;  // Articles per page
  currentPage = 0;  // Track the current page
  isBrowser = false;
  totalArticle = 0;

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.fetchNewsAsync();
      this.fetchHeadline()
    } else {
      this.isLoading = false;
    }
  }

  // Fetch news asynchronously
  async fetchNewsAsync() {
    const apiUrl = 'https://newsapi.org/v2/everything';
    const params = new HttpParams()
    .set('apiKey', '6d203f0cddc542e0a9e0c47de325158c')
    .set('q', 'news')

    try {
      this.isLoading = true;

      const data = await this.apiService.get<any>(apiUrl, params).toPromise();
      if (data && data.articles) {
        this.articles = data.articles;
        this.totalArticle = data.articles.length;
        this.loadArticlesInChunks(); // Load the initial chunk of articles
      } else {
        this.error = 'No articles available';
      }
    } catch (err) {
      this.error = 'Failed to fetch articles';
    } finally {
      this.isLoading = false;
    }
  }

  loadArticlesInChunks() {
    this.isPartialLoading = true; // Show partial loading spinner

    const nextPageStartIndex = this.currentPage * this.pageSize;
    const nextPageEndIndex = nextPageStartIndex + this.pageSize;

    const nextChunk = this.articles.slice(nextPageStartIndex, nextPageEndIndex);
    this.displayedArticles = [...this.displayedArticles, ...nextChunk];

    this.currentPage++; // Increment page count
    this.isPartialLoading = false; // Hide the partial loader once the chunk is loaded
  }

  loadMoreArticles() {
    if (!this.isPartialLoading && this.displayedArticles.length < this.articles.length) {
      this.loadArticlesInChunks(); // Load the next chunk of articles
    }
  }

  fetchHeadline() {
    const apiUrl = 'https://newsapi.org/v2/top-headlines';  // Replace with your actual API URL
    let params = new HttpParams()
    .set('apiKey', '6d203f0cddc542e0a9e0c47de325158c')
    .set('sources', 'bbc-news')

    this.apiService.get<any>(apiUrl, params).pipe(
      map(response => response.articles)
    ).subscribe({
      next: (data) => {
        this.headline = data;  // Assign the `docs` to `users`
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err;
        this.isLoading = false;
      },
    });
  }
}
