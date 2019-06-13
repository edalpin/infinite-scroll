import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { NewsService } from './services/news.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    NewsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
