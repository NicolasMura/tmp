import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { Router } from '@angular/router';
// import { fadeAnimation } from 'src/app/animations/fadeIntRoute';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  // animations: [fadeAnimation]
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    public booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks() {
    console.log('BooksListComponent - getAllBooks');
    console.log('books : ', this.books.length);
    this.booksService.getAllBooks().subscribe((books) => {
      this.booksService.books = books;
      console.log('books : ', this.booksService.books);
    });
  }

  goToBookDetails(id) {
    console.log('Go to id ' + id);
    this.router.navigate(['/book', id]);
  }

}
