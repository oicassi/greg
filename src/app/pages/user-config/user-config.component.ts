import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setupForm();
  }

  atualizarDados() {
    console.log(this.userForm.getRawValue());
  }

  get nome() {
    return this.userForm.get('nome');
  }

  get sobrenome() {
    return this.userForm.get('sobrenome');
  }

  get email() {
    return this.userForm.get('email');
  }

  get urlPagina() {
    return this.userForm.get('urlPagina');
  }

  get ddd() {
    return this.userForm.get('telefone').get('ddd');
  }
  get area() {
    return this.userForm.get('telefone').get('area');
  }
  
  get numero() {
    return this.userForm.get('telefone').get('numero');;
  } 
  
  get nomeUsuario() {
    return this.userForm.get('nomeUsuario');
  } 
  


  setupForm() {
    this.userForm = this.formBuilder.group({

      // Informações pessoais 
      nome: ['', [
        Validators.required,
        Validators.minLength(3),
      ]],
      sobrenome: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      localizacao: ['', [
        Validators.required,
      ]],
      telefone: this.formBuilder.group({
        area: ['', [
          Validators.minLength(2),
          Validators.pattern('^[0-9]+$')
        ]],
        ddd: ['', [
          Validators.minLength(3),
          Validators.pattern('^[0-9]+$')
        ]],
        numero: ['', [
          Validators.minLength(9),
          Validators.pattern('[-\s\./0-9]*$')
        ]],
      }),

      // Informações da página
      urlPagina: ['', [
        Validators.required,
      ]],
      visibilidade: ['publico', [
        Validators.required,
      ]],
      // Configurações da conta 
      nomeUsuario: ['', [
        Validators.required,
      ]],
    });
  }

}
