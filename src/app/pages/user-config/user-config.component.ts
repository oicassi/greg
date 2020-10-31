import { ResponseUser } from './../../shared/models/responses/response-user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { FileGregs } from './../../shared/models/file-greg';
import { UserConfigs } from './../../shared/models/user-configs';
import { UserConfigService } from './services/user-config.service';



@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

  userForm: FormGroup;
  file: File;
  fileGregs: FileGregs;
  preview: string;

  constructor(private formBuilder: FormBuilder, private userConfigService: UserConfigService) { }

  ngOnInit() {
    this.getUserData();
    this.senhaNovaValidacao();
    this.setupForm();
  }

  getUserData() {
    this.userConfigService
      .getUser()
      .subscribe((resposta: ResponseUser) => {
        console.log(resposta);
        let strImagem = 'data:image/jpeg;base64,'
        this.preview = resposta.data.imagemUsuario ? strImagem + resposta.data.imagemUsuario.base64Img : '';
        this.populateForm(resposta.data);
      },
        (err => {
          console.log(err);

        }))
  }

  atualizarDados() {
    let user = this.converteObjeto(this.userForm.getRawValue());

    this.userConfigService.postForm(user).subscribe(data => {
    }, error => {
      console.log(error);
    });
  }


  converteObjeto(obj: UserConfigs): UserConfigs {
    let senha1 = this.userForm.get('senhaAntiga').value;
    let senha2 = this.userForm.get('senhaNova').value;
    let user = obj;


    if ((senha1 && senha2)) {
      user = this.md5Passwords(user);
    }

    if (user.imagemUsuario) {
      var strImage = this.fileGregs.base64Img.replace(/^data:image\/[a-z]+;base64,/, "");
      user.imagemUsuario.base64Img = strImage;
    }

    console.log(user);
    
    return user;
  }



  handleFileInput(file: File) {
    this.file = file;
    this.fileGregs = new FileGregs();
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.preview = event.target.result
      this.fileGregs.base64Img = event.target.result;
    };
    reader.readAsDataURL(file);
    this.fileGregs.nome = file.name;
    console.log(this.fileGregs.base64Img == this.preview);

  }

  md5Passwords(user: UserConfigs) {
    let md5 = new Md5();
    let senha1 = user.senhaAntiga;
    let senha2 = user.senhaNova;

    user.senhaAntiga = md5.appendStr(senha1).end();
    user.senhaNova = md5.appendStr(senha2).end();

    return user;
  }


  senhaNovaValidacao() {
    if (this.userForm) {
      this.userForm.get('senhaNova').valueChanges
        .subscribe(valor => {
          if (valor) {
            this.userForm.get('senhaNova').setValidators(Validators.minLength(6))
            if (!this.userForm.get('senhaAntiga').value) this.userForm.get('senhaAntiga').setValue(undefined)
            this.validaSenhasDiferentes();
            this.userForm.get('senhaAntiga').setValidators(Validators.required)
          } else {
            this.resetaSenhas();
          }
        })
    }
  }

  resetaSenhas() {
    this.userForm.get('senhaAntiga').setValue('');
    this.userForm.get('senhaNova').clearValidators();
    this.userForm.get('senhaAntiga').clearValidators();
    this.userForm.get('senhaAntiga').reset();
    this.userForm.get('senhaNova').reset();
  }

  validaSenhasDiferentes() {
    if (this.userForm.get('senhaAntiga').value == this.userForm.get('senhaNova').value)
      return this.userForm.get('senhaNova').setErrors({ equivalent: true });
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
      email: ['', []],
      // Informações da página
      url: ['', [
        Validators.required,
      ]],
      imagemUsuario: ['', []],
      //Senhas
      senhaAntiga: ['', []],
      senhaNova: ['', []],
    }
    );
  }

  populateForm(user: UserConfigs) {

    this.userForm = this.formBuilder.group({

      // Informações pessoais 
      nome: [this.retornaAtributo(user.nome), [
        Validators.required,
        Validators.minLength(3),
      ]],
      sobrenome: [this.retornaAtributo(user.sobrenome), [
        Validators.required
      ]],
      email: [this.retornaAtributo(user.email), []],
      // Informações da página
      url: [this.retornaAtributo(user.urlPagina), [
        Validators.required,
      ]],
      imagemUsuario: [this.retornaAtributo(user.imagemUsuario), []],
      //Senhas
      senhaAntiga: ['', []],
      senhaNova: ['', []],
    }
    );
  }

  retornaAtributo(atributo) {
    console.log(atributo);
    
    return atributo ? atributo : '';
  }

  get nome() {
    if (this.userForm)
      return this.userForm.get('nome');
  }

  get senhaNova() {
    if (this.userForm)
      return this.userForm.get('senhaNova');
  }

  get senhaAntiga() {
    if (this.userForm)
      return this.userForm.get('senhaAntiga');
  }

  get sobrenome() {
    if (this.userForm)
      return this.userForm.get('sobrenome');
  }

  get email() {
    if (this.userForm)
      return this.userForm.get('email');
  }

  get url() {
    if (this.userForm)
      return this.userForm.get('url');
  }
}
