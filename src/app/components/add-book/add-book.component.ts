import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private bookService: BookService) {
    this.addBookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit(): void {

  }

  onSubmit(): any{
    this.bookService.addBook(this.addBookForm.value).subscribe((res:any) => {
      console.log('Book record add successfully!!!');
      this.ngZone.run(() => {
        this.router.navigateByUrl('/book-list')
      }, (err: any) => {
        console.log(err);
      });
    })
  }

}
