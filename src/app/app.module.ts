import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BooksListComponent } from './modules/books/components/books-list/books-list.component';
import { BookDetailComponent } from './modules/books/components/book-detail/book-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BooksService } from './modules/books/services/books.service';
import { environment } from './../environments/environment';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataFakeBooksService }  from './modules/books/services//in-memory-data-fake-books.service';
import { BooksModule } from './modules/books/books.module';

@NgModule({
  declarations: [
    AppComponent,
    // BooksListComponent,
    // BookDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BooksModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    environment.production ? 
      [] : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataFakeBooksService, { dataEncapsulation: false, delay: 2000 })
  ],
  providers: [HttpClient, BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
