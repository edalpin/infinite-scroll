import { Component, OnInit } from '@angular/core';

import { NewsService } from '../services/news.service';
import { News } from '../interfaces/news.interface';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentComponent implements OnInit {
  news: News[];
  loadingNews = false;
  page = 1;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews(this.page).subscribe((news: News[]) => {
      this.news = news;
      this.page++;
    });
  }

  getMoreNews(): void {
    this.loadingNews = true;
    this.newsService.getNews(this.page).subscribe((news: News[]) => {
      this.news.push(...news);
      this.loadingNews = false;
      this.page++;
    });
  }
}
