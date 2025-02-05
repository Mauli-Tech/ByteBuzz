import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryNewsComponent } from './pages/category-news/category-news.component';
import { TopicNewsComponent } from './pages/topic-news/topic-news.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category', component: CategoryNewsComponent },
  { path: 'topic/:topic', component: TopicNewsComponent },
  { path: 'news/:title/:source', component: NewsDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
