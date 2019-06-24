import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';


@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [BooksListComponent, BookDetailComponent]
})
export class BooksModule {}