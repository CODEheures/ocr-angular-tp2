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
  public fileIsUploading = false
  public fileIsUploaded = false
  public fileUrl: string
  public msgError: string

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
        photo: this.fileUrl,
        synopsis: this.bookFormGroup.value['synopsis']
      }
    )
    this.router.navigate(['/books'])
  }

  onFileChange(file: File) {
    this.fileIsUploading = true
    this.bookFormGroup.controls['photo'].disable()

    // If a file is already uploaded we delete this
    if (this.fileUrl && this.fileIsUploaded) {
      this.bookService.deleteFile(this.fileUrl)
    }

    // Upload a new file
    this.bookService.uploadFile(file)
      .then((url: string) => {
        this.fileUrl = url
        this.fileIsUploading = false
        this.fileIsUploaded = true
        this.bookFormGroup.controls['photo'].enable()
      })
      .catch((error) => {
        this.fileIsUploading = false
        this.fileIsUploaded = false
        this.msgError = error
      })
  }
}
