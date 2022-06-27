import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  getId: any;
  updateBookForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router , private ngZone: NgZone, private activatedRoute: ActivatedRoute, private bookService: BookService) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.getBook(this.getId).subscribe(res => {
      console.log(res)
      this.updateBookForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description']
      })
    });

    this.updateBookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  onUpdate() {
    this.bookService.updateBook(this.getId, this.updateBookForm.value).subscribe(res => {
      console.log('Book record updated successfully!!!');
      this.ngZone.run(() => {
        this.router.navigateByUrl('/book-list')
      }, (err: any) => {
        console.log(err);
      });
    })
  }

}
