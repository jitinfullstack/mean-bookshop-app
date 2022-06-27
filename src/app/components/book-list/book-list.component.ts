import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  Books: any = [];
  constructor(private bookService: BookService) { }

  ngOnInit(): void {

    this.bookService.getBooks().subscribe(res => {
      console.log(res)
      this.Books = res;
    })
  }

  delete(id:any, i:any){
    console.log(id);
    if(window.confirm('Are you sure you want to delete')) {
      this.bookService.deleteBook(id).subscribe(res => {
        this.Books.splice(i, 1);
      })
    }
  }

}
