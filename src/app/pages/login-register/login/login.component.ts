import { HttpError } from './../../../shared/models/http-error';
import { AlertService } from './../../../shared/components/alert/alert.service';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AuthenticationService } from "src/app/core/_services";
import HttpStatusCode from 'src/app/shared/enums/http-status';


@Component({
  selector: 'app-login',
  templateUrl: "login.component.html" 
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  @Output() onRegister= new EventEmitter(); 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  changeValor(){
    this.onRegister.emit(false);
  }
  
  onMudouValor(evento){
    console.log(evento);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error: HttpError) => {
          if(error.status == HttpStatusCode.UNAUTHORIZED){
            this.alertService.danger("Login ou senha inválidos");
            this.loading = false;
          } else {
            this.alertService.danger("Não foi possível contactar o servidor");
            this.loading = false;
          }
        }
      );

    // var user = <User>({
    //   email : this.f.email.value,
    //   password : this.f.password.value,
    //   token: 'some_bullshit_token'
    // })

    // localStorage.setItem('authToken', JSON.stringify(user));
    // this.router.navigate([this.returnUrl]);
  }
}
