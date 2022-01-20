import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  template: `
  <!-- Navigation-->
  <nav class="animated fadeInDown navbar navbar-expand-lg navbar-light fixed-top" id="mainNav" [@fade]="state">
      <div class="container px-4 px-lg-5">
          <a class="navbar-brand" routerLink="/"><img src="assets/img/owl.svg" width="70" /> LitHeritage</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"
              (click)="isCollapsed = !isCollapsed">
              Menu
              <i class="fa fa-bars"></i>
          </button>
          <div [ngbCollapse]="!isCollapsed" class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ms-auto py-4 py-lg-0">
                  <li class="nav-item" *ngFor="let link of linkMenu">
                    <a class="nav-link px-lg-3 py-3 py-lg-4" [routerLink]="this.auth.checkDir() + link.url">{{link.text}}</a>
                  </li>
                  <li *ngIf="!this.auth.notExpired(); else logout" class="nav-item">
                    <a class="nav-link px-lg-3 py-3 py-lg-4" routerLink="login">Login <i class="fa fa-lock"></i></a>
                  </li>
                  <ng-template #logout>
                    <li class="nav-item">
                      <a class="nav-link px-lg-3 py-3 py-lg-4" routerLink="logout">Logout <i class="fa fa-unlock"></i></a>
                    </li>
                  </ng-template>
              </ul>
          </div>
      </div>
  </nav>
  <!-- Page Header-->
  <header class="masthead" style="background-image: url('assets/img/home-bg.jpg')">
    <div class="overlay"></div>
      <div class="container position-relative px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-md-10 col-lg-8 col-xl-7">
                  <div class="site-heading">
                      <h1 class="title">Litheritage App <img src="assets/img/owl.svg" width="70" /></h1>
                      <span class="subheading"><small><cite><strong>The free worldwide literature of Humanity</strong></cite></small></span>
                  </div>
              </div>
          </div>
      </div>
  </header>
  `,
  styles: [
    `
    .navbar-brand{
      font-family: 'Amatic SC', cursive;
      font-size:47px;
    }
    .title{
      font-family: 'Amatic SC', cursive;
    }

    .fa.fa-book{
      color:orange;
    }

    .masthead{
      max-height:500px;
    }

    header.masthead .overlay{
      position:absolute;
      top:0;
      left:0;
      height:100%;
      max-height:500px;
      width:100%;
      background-color: #212529;
      opacity: 0.3;
    }

    #mainNav .navbar-nav > li.nav-item > a{
      font-size:13px;
      font-weight:400;
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .sticky{
      background: #fff !important;
      box-shadow: 0 3px 12px  0 rgba(0, 0, 0, 0.7);
      position:fixed !important;
      color: #444;
      top: 0;
      height: auto;
      max-height: 250px;
      float: left;
      width: 100%;
    }

    .sticky a.navbar-brand{
      color: #222 !important;
      font-weight:bold;
    }

    .sticky li a{
      color: #222 !important;
      font-weight:bold;
    }

    .sticky a.navbar-brand:hover{
      color: #0085A1 !important;
    }
    .sticky .navbar-nav > li.nav-item > a.nav-link:hover{
      color: #0085a1 !important;
    }

    @media (min-width:280px) and (max-width:369px){
      .navbar-brand{
        font-size:30px;
      }
    }
    `
  ],

  animations: [
    trigger('fade',
      [
        state('void', style({ opacity: 0.9 })),
        transition(':enter', [animate(300)]),
        transition(':leave', [animate(500)]),
      ]
    )
  ]
})
export class HeaderComponent implements OnInit {
  red!: string;
  isCollapsed!: any;
  linkMenu!: any;
  state = 'void';

  constructor(public auth: AuthService, @Inject(DOCUMENT) document) {
    this.linkMenu = [
      { text: 'Home', url: '' }
    ];
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (window.pageYOffset > 40) {
      let element = document.getElementById('mainNav');
      element.classList.add('sticky');

    } else {
      let element = document.getElementById('mainNav');
      element.classList.remove('sticky');
    }
  }

  ngOnInit(): void {
    this.red = 'red';
  }

}

