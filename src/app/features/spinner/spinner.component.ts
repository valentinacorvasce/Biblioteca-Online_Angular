import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
      <div class="d-flex justify-content-center">
        <div class="spinner-grow text-info m-5" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

  `,
  styles: [
    `
    .spinner-grow{
      background-color: #0085A1;
    }
    `
  ]
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
