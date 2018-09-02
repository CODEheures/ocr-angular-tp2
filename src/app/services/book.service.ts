import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { Subject } from 'rxjs';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = []
  public booksSubject: Subject<Book[]>

  constructor() {
    this.booksSubject = new Subject
  }

  publishBooks() {
    this.booksSubject.next(this.books.slice())
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books)
  }

  getBooks() {
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : []
      this.publishBooks()
    })
  }

  async getBookById(id: number) {
    try {
      const data = await firebase.database().ref('/books/' + id).once('value')
      return data.val()
    } catch (error) {
      throw(error)
    }
  }

  createNewBook(book: Book) {
    this.books.push(book)
    this.saveBooks()
    this.publishBooks()
  }

  async deleteBook(id: number) {
    try {
      await firebase.database().ref('/books/' + id).remove()
    } catch (error) {
      throw(error)
    }
  }
}
