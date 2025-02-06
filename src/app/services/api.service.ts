import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  BASE_URL = "https://news-api-zapn.onrender.com"

  getLatestNews(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + "/top-news");
  }

  getCategoryNews(category: any, pageNumber: any): Observable<any> {
    return this.http.get<any>(this.BASE_URL + "/category/" + category + "?page=" + pageNumber);
  }

  getTopicNews(topic: any, pageNumber: any): Observable<any> {
    return this.http.get<any>(this.BASE_URL + "/topic/" + topic + "?page=" + pageNumber);
  }

  getDetailedNews(link: any): Observable<any> {
    return this.http.get<any>(this.BASE_URL + "/news?link=" + link);
  }

  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + "/category-all");
  }

  getAllTopics(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + "/topic-all");
  }
}
