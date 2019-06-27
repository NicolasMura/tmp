import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RouterModule } from '@angular/router';
import { BooksService } from './services/books.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataFakeBooksService } from './services/in-memory-data-fake-books.service';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule } from '@angular/material';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    environment.production ? 
      [] : HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataFakeBooksService,
        { dataEncapsulation: false, delay: 1000 }
      ),
    NgxMasonryModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports: [],
  declarations: [
    BooksListComponent,
    BookDetailComponent,
    CartComponent
  ],
  providers: [
    BooksService,
    CartService
  ],
})
export class BooksModule {}