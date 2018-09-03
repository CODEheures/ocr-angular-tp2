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
      throw(error.message as firebase.FirebaseError)
    }
  }

  createNewBook(book: Book) {
    this.books.push(book)
    this.saveBooks()
  }

  async deleteBook(id: number) {
    try {
      await this.deleteFile(this.books[id].photo)
      await firebase.database().ref('/books/' + id).remove()
    } catch (error) {
      throw(error.message as firebase.FirebaseError)
    }
  }

  async deleteFile(url: string) {
    try {
      await firebase.storage().refFromURL(url).delete()
    } catch (error) {
      throw(error.message as firebase.FirebaseError)
    }
  }

  uploadFile(file: File) {
    const uniqueName = Date.now().toString() + file.name
    return new Promise((resolve, reject) => {
      const upload = firebase.storage().ref().child('images/' + uniqueName).put(file)
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('chargement en cours...')
        },
        (error: firebase.FirebaseError) => {
          reject(error.message)
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then((url: string) => {
            resolve(url)
          })
        }
      )
    })
  }
}
