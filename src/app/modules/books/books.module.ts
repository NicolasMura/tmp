import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [],
  declarations: [BooksListComponent, BookDetailComponent]
})
export class BooksModule {}