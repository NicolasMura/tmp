import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books/components/books-list/books-list.component';
import { BookDetailComponent } from './books/components/book-detail/book-detail.component';
import { CartComponent } from './cart/components/cart/cart.component';

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
