import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../model/book';

const apiUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  // Metodo Get Ricezione Dati
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(apiUrl)
  }

  // Metodo Post aggiunta dati
  addBook(form: NgForm): Observable<Book> {
    return this.http.post<Book>(`${apiUrl}`, form.value)
  }

  // Metodo Patch modifica dati
  editBook(form: NgForm, active: Book): Observable<Book> {
    return this.http.patch<Book>(`${apiUrl}?id=${active.id}`, form.value)
  }

  // Metodo Delete cancellazione dati
  deleteBook(book: Book): Observable<Book> {
    return this.http.delete<Book>(`${apiUrl}?id=${book.id}`)
  }

  // Passaggio Parametri
  detailBook(id: any): Observable<Book> {
    return this.http.get<Book>(`${apiUrl}?id=${id}`);
  }


  constructor(private http: HttpClient) { }
}
