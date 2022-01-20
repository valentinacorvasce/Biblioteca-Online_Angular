import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <!-- Footer-->
  <footer class="border-top">
      <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
              <div class="col-md-10 col-lg-8 col-xl-7">
                  <ul class="list-inline text-center">
                      <li class="list-inline-item">
                          <a href="https://twitter.com/Valenti81281053" target="_blank">
                              <span class="fa-stack fa-lg">
                                  <i class="fa fa-circle fa-stack-2x"></i>
                                  <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
                              </span>
                          </a>
                      </li>
                      <li class="list-inline-item">
                          <a href="https://www.facebook.com/valentina.milton.9/" target="_blank">
                              <span class="fa-stack fa-lg">
                                  <i class="fa fa-circle fa-stack-2x"></i>
                                  <i class="fa fa-facebook-f fa-stack-1x fa-inverse"></i>
                              </span>
                          </a>
                      </li>
                      <li class="list-inline-item">
                          <a href="https://github.com/valentinacorvasce" target="_blank">
                              <span class="fa-stack fa-lg">
                                  <i class="fa fa-circle fa-stack-2x"></i>
                                  <i class="fa fa-github fa-stack-1x fa-inverse"></i>
                              </span>
                          </a>
                      </li>
                  </ul>
                  <div class="small text-center text-muted fst-italic">
                    Copyright &copy; <a href="https://helloworld.altervista.org" target="_blank">Valentina</a>
                    {{currentY}}
                  </div>
              </div>
          </div>
      </div>
  </footer>
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

    footer{
      position:relative;
      bottom:0;
    }

    .fst-italic{
      font-family: 'PT Serif', serif;
      font-weight:700;
      font-style:italic;
      font-size:17px;
    }

    .fa-circle{
      color:orange;
    }

    .border-top{
      border-top: 1px dashed rgba(0, 133, 161, 0.4) !important;
    }
    `
  ]
})
export class FooterComponent implements OnInit {
  currentY: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
