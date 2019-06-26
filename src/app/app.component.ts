import { Component } from '@angular/core';
import { fadeAnimation } from './shared/animations/fadeIntRoute';
import { BooksService } from './modules/books/services/books.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title: string = 'hello-henri';

  constructor(
    public booksService: BooksService
  ) {}

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
    // console.log('BooksListComponent - getAllBooks');
    // console.log('books : ', this.books.length);
    this.booksService.getAllBooks().subscribe((books) => {
      this.booksService.books = books;
      console.log('books : ', this.booksService.books);
    });
  } 
  
}
