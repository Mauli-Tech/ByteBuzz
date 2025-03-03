import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.scss']
})
export class CategoryNewsComponent implements OnInit {

  categoryName: any;
  allNews: any = [];
  latestNews: any = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageNumber = 1
  routeSub: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const newCategory = params.get('category');
      if (newCategory !== this.categoryName) {
        this.categoryName = newCategory;
        this.loadNews();
      }
    });
  }

  loadNews(): void {
    this.apiService.getCategoryNews(this.categoryName, this.pageNumber).subscribe((data: any) => {
      this.allNews = data.news;
    });
  }

  changePage(page: number): void {
    if (page < 1) return; // Prevent out-of-bound pages
    this.pageNumber = page
    this.loadNews()
  }

  viewNewsDetails(news: any): void {
    const encodedTitle = encodeURIComponent(news.title);
    const encodedSource = encodeURIComponent(news.link);
    this.router.navigate(['/news', encodedTitle, encodedSource]);
  }

}
