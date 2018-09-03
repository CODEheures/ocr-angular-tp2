import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit, OnDestroy {

  public books: Book[]
  public booksSubscription: Subscription
  public msgError: string
  public faMinus = faMinus

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.booksSubscription = this.bookService.booksSubject.subscribe((books: Book[]) => {
      this.books = books
    })
    this.bookService.getBooks()
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe()
  }

  onNewBook() {
    this.router.navigate(['/books', 'new'])
  }

  onDeleteBook(id: number) {
    try {
      this.bookService.deleteBook(id)
    } catch (error) {
      this.msgError = error
    }
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', id])
  }
}
