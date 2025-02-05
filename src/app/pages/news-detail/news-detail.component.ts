import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  newsItem: any;
  isLoading = true
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
    const source = this.route.snapshot.paramMap.get('source');
    if (source) {
      this.apiService.getDetailedNews(source).subscribe(
        (news) => {
          this.newsItem = news
          this.isLoading = false
        },
        () => this.router.navigate(['/'])
      );
    } else {
      this.router.navigate(['/']);
    }
  }
}
