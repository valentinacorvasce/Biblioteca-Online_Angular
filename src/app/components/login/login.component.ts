import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  template: `
      <main class="mb-4">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-md-10 col-lg-8 col-xl-7">
                    <div  *ngIf="showMsg" class="alert alert-danger text-center">
                        <p>{{showMsg}}</p>
                    </div>
                    <div class="my-5">
                        <form id="contactForm" #f="ngForm" (ngSubmit)="sendLogin(f)">
                            <div class="form-floating">
                                <input class="form-control" id="name" type="text" name="username" placeholder="Enter your name..." #username="ngModel" [ngModel]="modelUser" required />
                                <label for="name">Username</label>
                                <div style="color:red" *ngIf="username.invalid && username.touched">
                                  <small style="font-size:0.75em;">* Il campo Username è obbligatorio!</small>
                                </div>
                            </div>
                            <div class="form-floating">
                                <input class="form-control" id="pass" type="password" name="password" placeholder="Enter your Password..." #password="ngModel" [ngModel]="modelPass" required />
                                <label for="pass">Password</label>
                                <div style="color:red" *ngIf="password.invalid && password.touched">
                                  <small style="font-size:0.75em;">* Il campo Password è obbligatorio!</small>
                                </div>
                            </div>
                            <div class="checkbox m-5 d-flex flex-column align-items-center">
                              <p class="">Torna alla <a routerLink=""><span>Home</span></a></p>
                            </div>

                            <br />

                            <div class="col-sm-12 mb-5">
                              <re-captcha id="recaptcha" name="recaptcha" #recaptcha="ngModel" [(ngModel)]="token" required [class.is-invalid]="recaptcha.invalid && (recaptcha.dirty || recaptcha.touched)"></re-captcha>
                              <div *ngIf="recaptcha.invalid && (recaptcha.dirty || recaptcha.touched)" class="invalid-feedback">
                                <div *ngIf="recaptcha.errors?.['required']">Stai attento al reCaptcha!</div>
                              </div>
                            </div>

                            <!-- Submit Button-->
                            <div class="d-grid gap-2">
                              <button class="btn btn-primary text-uppercase" [disabled]="f.invalid" id="submitButton" type="submit" (click)="send(f)">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
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

    .form-control:focus {
      border-color: #0085A1;
  }

  re-captcha.is-invalid > div {
    border: 1px solid #dc3545 !important;
    border-radius: 0.2rem;
  }
    `
  ]
})
export class LoginComponent implements OnInit {
  modelUser!: string;
  modelPass!: string;
  showMsg!: string;
  token: string | undefined;

  sendLogin(form: NgForm) {
    this.auth.login(form)
      .subscribe(res => {
        // alert('il token è: ' + res)
        this.router.navigateByUrl('book');
      },
        error => this.showMsg = error
      )
  }

  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    console.debug(`Token [${this.token}] generated`);
  }

  constructor(private auth: AuthService, private router: Router) {
    this.token = undefined;
  }

  ngOnInit(): void {
    this.auth.logout();
  }

}
