import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styles: []
})
export class BookEditComponent implements OnInit {

  public bookFormGroup: FormGroup

  constructor(private formBuilder: FormBuilder,
              private bookService: BookService,
              private router: Router) { }

  ngOnInit() {
    this.bookFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      photo: ['', Validators.required],
      synopsis: ['', Validators.required]
    })
  }

  onSubmit() {
    this.bookService.createNewBook(
      {
        title: this.bookFormGroup.value['title'],
        photo: this.bookFormGroup.value['photo'],
        synopsis: this.bookFormGroup.value['synopsis']
      }
    )
    this.router.navigate(['/books'])
  }

}
