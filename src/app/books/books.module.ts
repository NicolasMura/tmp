import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { BooksListComponent, DialogOverviewExampleDialog } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RouterModule } from '@angular/router';
import { BooksService } from '../services/books.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataFakeBooksService } from '../services/in-memory-data-fake-books.service';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule, MatFormFieldModule, MatInputModule, MatDialog, MatDialogModule } from '@angular/material';
import { FormsModule }   from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // + remove fake API endpoint in environment.ts
    environment.production ? 
      [] : HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataFakeBooksService,
        { dataEncapsulation: false, delay: 1000 }
      ),
    NgxMasonryModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [],
  declarations: [
    BooksListComponent,
    BookDetailComponent,
    FilterPipe,
    DialogOverviewExampleDialog
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [
    BooksService
  ],
})
export class BooksModule {}