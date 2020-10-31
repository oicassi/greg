import { FileGregs } from './../../shared/models/file-greg';
import { UserConfigs } from './../../shared/models/user-configs';
import { UserConfigService } from './services/user-config.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';



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
    this.setupForm();
    this.senhaNovaValidacao();
  }

  atualizarDados() {
    let user = this.converteObjeto(this.userForm.getRawValue());

    this.userConfigService.postForm(user).subscribe(data => {
      // do something, if upload success
      
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

    if(user.imagemUsuario) { 
      user.imagemUsuario = this.fileGregs
    }

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
      nome: ['asdas', [
        Validators.required,
        Validators.minLength(3),
      ]],
      sobrenome: ['asdas', [
        Validators.required
      ]],
      email: ['', []],
      // Informações da página
      urlPagina: ['asdas', [
        Validators.required,
      ]],
      imagemUsuario: ['', []],
      //Senhas
      senhaAntiga: ['', []],
      senhaNova: ['', []],
    }
    );
  }
  
  get nome() {
    return this.userForm.get('nome');
  }
  
  get senhaNova() {
    return this.userForm.get('senhaNova');
  }
  
  get senhaAntiga() {
    return this.userForm.get('senhaAntiga');
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
}
