import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  topNews: any = []
  latestNews: any = []
  constructor(private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchNews()
  }

  fetchNews(): void {
    this.apiService.getLatestNews().subscribe({
      next: (data: any) => {
        this.topNews = data.news[0]
        this.latestNews = data.latest_news
      },
      error: (err: any) => console.error('Error fetching news:', err)
    });
  }

  viewNewsDetails(news: any): void {
    const encodedTitle = encodeURIComponent(news.title);
    const encodedSource = encodeURIComponent(news.link);
    this.router.navigate(['/news', encodedTitle, encodedSource]);
  }

}
