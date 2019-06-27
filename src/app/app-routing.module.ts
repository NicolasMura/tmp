import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './modules/books/components/books-list/books-list.component';
import { BookDetailComponent } from './modules/books/components/book-detail/book-detail.component';
import { CartComponent } from './modules/books/components/cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksListComponent },
  { path: 'books/:isbn', component: BookDetailComponent },
  { path: 'cart', component: CartComponent },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
