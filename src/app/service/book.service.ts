import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Book } from './book';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  restapi_url:string = 'http://localhost:3000/api';
  httpHeaders = new HttpHeaders().set('Content-Type','application/json');

  constructor(private httpClient: HttpClient) { }

  // Add records
  addBook(data: Book) : Observable<any> {
    let API_URL = `${this.restapi_url}/add-book`;
    return this.httpClient.post(API_URL, data).pipe(catchError(this.handleError))
  }

  // Get all records
  getBooks() {
    return this.httpClient.get(`${this.restapi_url}`);
  }

  // Get single book
  getBook(id: any) : Observable<any> {
    let API_URL = `${this.restapi_url}/read-book/${id}`;
    return this.httpClient.get(API_URL, {headers: this.httpHeaders}).pipe(map((res: any) => {
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  // Update book data
  updateBook(id: any, data: any) : Observable<any> {
    let API_URL = `${this.restapi_url}/update-book/${id}`;
    return this.httpClient.put(API_URL, data, {headers: this.httpHeaders}).pipe(catchError(this.handleError))
  }

  // Delete book
  deleteBook(id: any) : Observable<any> {
    let API_URL = `${this.restapi_url}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, {headers: this.httpHeaders}).pipe(catchError(this.handleError))
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code : ${error.status}\nMessage : ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
