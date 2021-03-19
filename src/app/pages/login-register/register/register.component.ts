import HttpStatusCode from 'src/app/shared/enums/http-status';
import { HttpError } from './../../../shared/models/http-error';
import { AlertService } from './../../../shared/components/alert/alert.service';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { Output, EventEmitter } from '@angular/core';

import {
  UserService,
  AuthenticationService,
} from "src/app/core/_services";

@Component({ selector: 'app-register', templateUrl: "register.component.html" })
export class RegisterComponent implements OnInit {
  
  
  @Output() onCancel= new EventEmitter(); 
  
  
  registerForm: FormGroup;
  loading = false;
  submitted = false;


  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate([""]);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nome: ["", Validators.required],
      sobrenome: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      url: ["",Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  changeValor(){
    this.onCancel.emit(true);
  }

  onSubmit() {
    window.localStorage.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success("Registrado com sucesso");
          this.changeValor();
        },
        (error:HttpError) => {
          if(error.status == HttpStatusCode.BAD_REQUEST){
            this.alertService.danger("Usuário já cadastrado");
            this.loading = false;
          } else {
            this.alertService.danger("Sei la tio");
            this.loading = false;
          }
        }
      );
  }
}
