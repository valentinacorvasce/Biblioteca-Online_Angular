import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <form id="contactForm" #f="ngForm" (submit)="save(f)">
      <div class="form-floating">
        <input [ngModel]="active?.author" class="form-control" id="author" type="text" name="author" placeholder="Insert Author..." required />
        <label for="author">Book Author</label>
      </div>
        <div class="form-floating">
            <input [ngModel]="active?.country" class="form-control" id="country" type="text" name="country" placeholder="Insert Country..." required />
            <label for="country">Book Country</label>
        </div>
        <div class="form-floating">
          <input [ngModel]="active?.language" class="form-control" id="lang" type="text" name="language" placeholder="Insert Language..." required />
          <label for="lang">Language</label>
        </div>
        <div class="form-floating">
          <input [ngModel]="active?.link1" class="form-control" id="link1" type="text" name="link1" placeholder="Insert Link..." />
          <label for="link1">Link to English download</label>
        </div>
        <div class="form-floating">
          <input [ngModel]="active?.link2" class="form-control" id="link2" type="text" name="link2" placeholder="Insert Link..." />
          <label for="link2">Link to Italian download</label>
        </div>
        <div class="form-floating">
            <input [ngModel]="active?.pages" class="form-control" id="pages" type="number" min="1" name="pages" placeholder="Page Number..." required />
            <label for="pages">Pages Number</label>
        </div>
        <div class="form-floating">
            <input [ngModel]="active?.title" class="form-control" id="name" type="text" name="title" placeholder="Insert Title..." required />
            <label for="title">Book Title</label>
        </div>
        <div class="form-floating">
            <input [ngModel]="active?.year" class="form-control" id="year" type="text" name="year" placeholder="Year of publishing..." required />
            <label for="year">Year</label>
        </div>
        <div class="form-floating space">
            <textarea [ngModel]="active?.descr" class="form-control" id="descr" type="text" name="descr" placeholder="Insert text..." required></textarea>
            <label for="descr">Link Description</label>
        </div>
        <div class="input-group mt-5 mb-3">
            <label class="input-group-text" for="inputGroupFile01">Upload</label>
            <input type="file" class="form-control" id="inputGroupFile01" (change)="readUrl($event)">
        </div>
        <div>
            <img *ngIf="active" [src]="active?.imageLink" height="120" />
            <img *ngIf="this.imageSrc" [src]="this.imageSrc" height="120" />
            <!-- <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03" (click)="selectedFile.click()">Select Image</button> -->
        </div>
        <br />

        <!-- Submit Button-->
        <input *ngIf="this.imageSrc" [ngModel]="this.imageSrc" type="hidden" name="imageLink" />
        <input *ngIf="active" [ngModel]="active.imageLink" type="hidden" name="imageLink" />
        <button class="btn btn-outline-warning text-uppercase mx-3" id="submitButton" type="submit" [disabled]="f.invalid"><b>{{active ? 'Edit': 'Add'}}</b></button>
        <button class="btn btn-outline-success text-uppercase" id="submitButton" type="button" (click)="reset(f)"><b>Reset</b></button>
    </form>
  `,
  styles: [
    `
    form{
      font-family: 'PT Serif', serif;
      font-weight:400;
      font-style:italic;
    }
    .space textarea{
      height: 9rem !important;
    }
    .form-control:focus {
      border-color: #0085A1;
  }
    `
  ]
})
export class FormComponent implements OnInit {
  @Input() active!: any;
  @Input() books!: Book[];
  @Output() resetClick: EventEmitter<Book> = new EventEmitter<Book>();
  imageSrc!: any;

  save(form: NgForm) {
    if (this.active) {
      this.edit(form)
    } else {
      this.add(form)
    }
  }

  add(form: NgForm) {
    this.bookService.addBook(form)
      .subscribe((res: Book) => {
        setTimeout(() => {
          this.books.push(res);
        }, 500);
        location.reload();
        form.reset();
        this.imageSrc = null;
      });
  }

  edit(form: NgForm) {
    this.bookService.editBook(form, this.active)
      .subscribe(res => {
        const index = this.books.findIndex(b => b.id === this.active.id);
        this.books[index] = res;
        location.reload();
      })
  }

  reset(form: NgForm) {
    this.active = null;
    this.imageSrc = null;
    this.resetClick.emit();
    form.reset();
  }

  readUrl(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      if (this.active) {
        reader.onload = () => {
          this.active.imageLink = reader.result as string;
        }
      } else {
        reader.onload = () => {
          this.imageSrc = reader.result as string;
        }
      }
    }
  }

  constructor(private http: HttpClient, private bookService: BookService) { }

  ngOnInit(): void {
  }

}
