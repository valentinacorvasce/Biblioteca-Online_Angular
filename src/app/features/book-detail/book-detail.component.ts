import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';



@Component({
  selector: 'app-book-detail',
  template: `
  <div class="container-fluid">
    <app-spinner *ngIf="!book"></app-spinner>
      <div *ngIf="book" class="row">
        <div class="col-lg-8 col-md-10 mx-auto my-5 flex-c">
          <div class="pull-right">
            <img class="img-thumbnail dim" width="350" [src]="book.imageLink" [alt]="book.title">
          </div>
          <div class="post-preview">
            <h2 class="post-title"><strong>{{book.title}}</strong></h2>
            <small class="post-meta">
              <strong>author</strong>: {{book.author}}
            </small>
            <small class="post-subtitle">
              <br>
              <strong>Publishing Country</strong>: {{book.country}}
            </small>
            <small class="post-subtitle">
              <br>
              <strong>Publishing Year</strong>: {{book.year}}
            </small>
            <small class="post-subtitle">
              <br>
              <strong>Language</strong>: {{book.language}}
            </small>
            <small class="post-subtitle">
              <br>
              <strong>Pages</strong>: {{book.pages}}
            </small>
            <small class="post-subtitle">
              <br>
              <div class="link">
                  <strong>Link to English download</strong>: <br><a href="{{book.link1}}" target="_blank">{{book.link1}}</a>
              </div>
            </small>
            <small class="post-subtitle">
              <br>
              <div class="link">
                  <strong>Link to Italian download</strong>: <br><a href="{{book.link2}}" target="_blank">{{book.link2}}</a>
              </div>
            </small>
            <small class="post-subtitle">
              <br>
              <div class="link desc">
                  <strong>Description</strong>: <br><p class="cursiveFont">{{book.descr}}</p>
              </div>
            </small>
            <div class="d-flex justify-content-start mt-5"><button class="btn btn-secondary text-uppercase" (click)="goBack()"><i class="fa fa-arrow-circle-left"></i> Back</button></div>
          </div>
        </div>
    </div>
  </div>
  `,
  styles: [
    `
    a{
      color:#0085A1 !important;
      text-decoration:none;
    }

    a:hover{
      color:#ffa500 !important;
    }
    .post-preview {
      line-height:2em;
      font-size:19px;
      letter-spacing:0.1em;
    }
    .cursiveFont {
      font-family: 'PT Serif', serif;
      font-weight:400;
      font-style:italic;
    }
    .btn-group-sm > .btn, .btn-sm {
      padding: .25rem .5rem;
      font-size: .875rem;
      line-height: 1.5;
      border-radius: .2rem;
    }
    .link{
      overflow-x: scroll;
      width: 350px;
    }
    .desc{
      overflow-x:hidden;
      width: 100%;
    }
    .post-meta{
      color:rgba(0, 133, 161);
    }

    @media (max-width:680px){
      .flex-c{
        display:flex;
        flex-direction:column;
        margin:auto;
        align-items:center;
      }
      .post-preview{
        margin:3rem auto;
      }
    }

    @media(min-width:768px) and(max-width:1024px){
      .dim{
        width:250px;
      }
    }
    `
  ]
})
export class BookDetailComponent implements OnInit {
  book!: Book;

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService, private location: Location) { }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.bookService.detailBook(id)
      .subscribe(res => {
        this.book = res;
      })
  }

}
