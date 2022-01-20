import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';


@Component({
  selector: 'app-books',
  template: `
      <!-- Main Content-->
      <div class="container px-4 px-lg-5">
        <div *ngIf="error" class="alert alert-danger text-center">Ops, qualcosa è andato storto!</div>
          <div class="row gx-4 gx-lg-5 justify-content-start">
              <div class="col-md-12 col-lg-6 col-xl-6 my-5">
                    <app-spinner *ngIf="!books"></app-spinner>
                  <div *ngFor="let book of books | filter:term | paginate: {itemsPerPage: 2, currentPage: p}" (click)="setActive(book)" [ngClass]="{'active': book.id === active?.id}" class="mb-5">
                    <!-- Post preview-->
                    <div class="post-preview">
                        <a>
                            <h2 class="post-title">{{book.title}}</h2>
                            <i class="fa fa-info-circle fa-2x" aria-hidden="true" style="float:right; color:#8080c0; cursor:pointer;" [routerLink]="['/book', book.id]"></i>
                            <h3 class="post-subtitle">{{book.author}}</h3>
                        </a>
                        <p class="post-meta">
                            {{book.language}},
                            {{book.year}}
                        </p>
                        <img class="img-thumbnail" width="70" height="70" [src]="book.imageLink ? book.imageLink : '../../assets/img/placehold.png'" />
                    </div>
                    <!-- Divider-->
                    <hr class="my-4" />
                    <!-- Pager-->
                    <div class="d-flex justify-content-end mb-4"><button class="btn btn-danger text-uppercase" (click)="delete($event, book)"><i class="fa fa-trash"></i> Cancel</button></div>
                  </div>
                  <pagination-controls (pageChange)="p = $event"></pagination-controls>
              </div>

              <div class="col-md-12 col-lg-6 col-xl-6">
                  <div class="my-5">
                    <label for="searchBar" class="form-label stylingLabel">Search Books</label>
                    <input type="text" class="form-control" id="searchBar" name="search" autocomplete="off" [(ngModel)]="term" placeholder="&#61442; Title or author..." />
                  </div>

                        <div class="my-5">
                          <h3 class="stylingH3 mb-3 mt-5">Add your favourite Books here!</h3>
                          <app-form [active]="active" [books]="books" (resetClick)="reset()"></app-form>
                        </div>
                    </div>
          </div>
      </div>
  `,
  styles: [
    `
    .active{
      text-decoration: none;
      color: #0085A1;
    }
    .post-meta{
      font-family: 'PT Serif', serif;
      font-weight:400;
      font-style:italic;
    }
    .stylingH3{
      font-weight:700;
    }
    .stylingLabel{
      font-size: 19px;
      font-weight: 700;
      font-family: 'PT Serif', serif;
      font-style: italic;
    }
    .form-control::placeholder{
      font-family: FontAwesome;
    }
    ::ng-deep .ngx-pagination .current{
      background: #6dd300 !important;
    }
    `
  ]
})
export class BooksComponent implements OnInit {
  books!: Book[];
  error!: any;
  active!: any;
  p = 1;
  term: any;

  constructor(private bookService: BookService) { }

  getAll() {
    this.bookService.getAll()
      .subscribe((res: Book[]) => {
        this.books = res;
      },
        err => this.error = err
      )
  }

  delete(event: { stopPropagation: () => void; }, book: Book) {
    event.stopPropagation();
    this.bookService.deleteBook(book)
      .subscribe(() => {
        const index = this.books.findIndex(b => b.id === book.id);
        this.books.splice(index, 1);
      },
        err => this.error = err
      )
  }

  setActive(book: Book) {
    this.active = book;

  }

  reset() {
    this.active = null;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
