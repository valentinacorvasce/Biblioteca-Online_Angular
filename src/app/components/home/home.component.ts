import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';


@Component({
  selector: 'app-home',
  template: `
  <div class="container">
      <div style="margin-bottom:20px">
        <h2 class="cards-title stylingLabel text-center">Search for your books</h2>
        <div class="bottom-m">
          <label for="searchBar" class="form-label"></label>
          <input type="text" class="form-control" id="searchBar" name="search" autocomplete="off" placeholder="&#61442; Title or author..." [(ngModel)]="term" />
        </div>
      </div>
      <div class="row">
        <app-spinner *ngIf="!books"></app-spinner>
        <div class="col-lg-4 col-md-6 col-sm-6 col-12" *ngFor="let book of books | filter:term | paginate: {itemsPerPage: 9, currentPage: p}">
          <figure class="figure">
            <img [src]="book.imageLink" class="figure-img img-fluid" />
            <figcaption class="figure-caption">
              <span class="price">{{book.language}}</span>
              <div class="strip">
                <h4>{{book.title}}</h4>
                <h5><b>Author</b>: <i>{{book.author}}</i></h5>
                <h6 style="text-align:center;">
                  <i class="fa fa-share-square-o fa-2x" aria-hidden="true"
                    [routerLink]="['book' , book.id]"></i>
                </h6>
              </div>
            </figcaption>
          </figure>
        </div>
        <pagination-controls (pageChange)="p = $event"></pagination-controls>
      </div>
  </div>
`,

  styles: [
    `
    figure {
      width:100%;
      border: none !important;
      margin-right: 15px;
      padding: 0 6px;
      padding-bottom:20px;
      -webkit-transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
      transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    }

    figure:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }

    figure img {
      display:block;
      margin:auto;
      height: 350px;
      width: 250px;
    }

    figcaption {
      padding: 8px;
      border: 1px dashed rgba(0, 133, 161, 0.4);
      border-top: none;
      margin-top: -10px !important;
    }

    .figure-caption h4 {
      margin-top:5px;
      font-size: 18px;
      font-weight: bolder;
    }

    .figure-caption h5 {
      font-size: 14px;
      font-weight: 400;
      color:rgba(0, 133, 161);
    }

    figcaption span.price {
      font-size: 14px;
      font-weight: 800;
      padding: 15px 25px;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-radius: 0;
      font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #212529;
      background-color: #6dd300;
      padding: 5px;
      position: absolute;
      margin-top: -15%;
      margin-left: -1.8% !important;
    }

    @media (max-width:600px){
      figcaption span.price{
        margin-top: -40%;
      }
    }

    @media (max-width:992px){
      figcaption span.price{
        margin-left: -3% !important;
      }
    }

    i.fa.fa-share-square-o {
      float: right;
      font-size: 1.5em;
      margin-right: 8px;
      text-align: center;
      margin-top:30px;
      color:#ffa500;
      cursor:pointer;
    }
    .strip{
      padding:10px;
    }
    .stylingLabel{
      font-size: 35px;
      font-weight: 700;
      font-family: 'PT Serif', serif;
      font-style: italic;
    }

    @media (max-width:480px){
      .stylingLabel{
        font-size:25px;
      }
    }
    .form-control::placeholder{
      font-family: FontAwesome;
    }

    ::ng-deep .ngx-pagination .current{
      background: #6dd300 !important;
    }

    ::ng-deep .ngx-pagination{
      display:block;
      margin: 3rem auto !important;
      text-align:center;
    }

    .bottom-m{
      margin-bottom: 5rem !important;
    }

    @media (min-width:992px){
      .bottom-m input{
        width:60%;
        margin: 0 auto;
        display:block;
      }
    }
    `
  ]
})

export class HomeComponent implements OnInit {
  books!: Book[];
  term!: any;
  p = 1;

  constructor(private bookService: BookService) { }

  getAll() {
    this.bookService.getAll()
      .subscribe(res => {
        this.books = res;
        console.log(this.books);
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

}
