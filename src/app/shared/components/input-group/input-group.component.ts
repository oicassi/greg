import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent implements OnInit {

  inputs = ['text', 'number'];
  classes = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ];

  @Input() label: string;                               // Texto para ser exibido acima do input
  @Input() icon: string;                                // Icone para ser colocado dentro do input
  @Input() inputType: string;                           // Tipo do input
  @Input() placeholder: string;                         // Placeholder para o input
  @Input() inputValue: any;                             // Valor inicial para o input
  @Input() class: string;                               // Classe do botão
  @Input() buttonLabel: string;                         // Label do botão
  @Input() bounceTime: number;                          // Tempo de espera para emissão do evento termOnInput
  @Input() required: boolean;                           // Se desejar adicionar a validação de campo obrigatório
  @Input() campoObrigatorioMsg: string;                 // Mensagem personalizada para o campo obrigatório
  @Output() termOnInput: EventEmitter<string> = new EventEmitter<string>()    // Emissor de evento para enviar o texto que está sendo digitado
  @Output() submitInput: EventEmitter<string> = new EventEmitter<string>()         // Emissor de evento para enviar o texto quando o formulário é submetido

  private term = new Subject<string>();                 // Para acionar o termOnInput passando para componente pai o input enquanto digita
  private finalTerm = '';                               // Quando submete o formulário, esse é o termo passado para o componente pai
  public btnClass = 'btn-outline-secondary';            // Classe do botão

  // Formulário;
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  /**
   * Faz um subscribe do termo digitado e o passa para o Output
   */
  ngOnInit(): void {
    this.term.pipe(
      debounceTime(this.bounceTime || 300),
      distinctUntilChanged(),
    ).subscribe((inputTerm: string) => {
      this.finalTerm = inputTerm;
      this.termOnInput.emit(inputTerm);
    })

    this.initValues();
  }

  /**
   * Inicializa os valores do inputGroup
   */
  initValues(): void {
    this.setInputType();
    this.setPlaceholder();
    this.setBtnClass();
    this.setBtnLabel();
    this.initForm();
    this.onInput(this.inputValue);
  }

  /**
   * Verifica o inputType
   */
  setInputType(): void {
    if (this.inputs.includes(this.inputType.toLowerCase())) {
      this.inputType = this.inputType.toLowerCase();
      return;
    }
    this.inputType = 'text';
  }

  /**
   * Seta um valor padráo para o placeholder caso não seja passado um
   */
  setPlaceholder(): void {
    this.placeholder = this.placeholder || 'Insira um dado...';
  }

  /**
   * Monta a classe do botão
   */
  setBtnClass(): void {
    if (!this.class) {
      return;
    }

    if (this.classes.includes(this.class.toLowerCase())) {
      this.btnClass = `btn-outline-${this.class.toLowerCase()}`;
      return;
    }

    this.btnClass = 'btn-outline-secondary';
  }

  /**
   * Verifica a o label passado para o botão
   */
  setBtnLabel(): void {
    if (!this.buttonLabel) {
      this.buttonLabel = 'Enviar';
    }
  }

  /**
   * Inicializa o formulário
   */
  initForm(): void {

    // Monta o array de validadores 
    let validadores = [];

    if (this.required) {
      validadores.push(Validators.required);
    }

    // Monta o formulário propriamente dito
    this.form = this._fb.group({
      generic_input: [
        (this.inputValue || ''),
        validadores
      ]
    })

    // this.form = this._fb.group({
    //   generic_input: ['', [Validators.required]]
    // })
  }

  /**
   * Processa o termo buscado no input
   * @param term Termo digitado
   */
  onInput(inputTerm: string): void {
    this.term.next(inputTerm);
  }

  /**
   * Submit do termo digitado no input
   */
  onSubmit(): void {
    console.log('Submitinginging')
    console.log(this.form.get('generic_input'));
    console.log(this.form.get('generic_input').value)
    console.log(this.form.get('generic_input').valid)
 
    // Marcar os campos do formulário como dirty
    this.verificarCamposFormularios();

    // Verifica se tem erro no preenchimento
    if (!this.verificarValidadeForm()) {
      return;
    }

    // Emite o termo 
    this.submitInput.emit(this.form.get('generic_input').value);
  }

  /**
 * Marcar os campos de um formulário como dirty e touched
 * @param form Formulário para ser processado
 */
  verificarCamposFormularios() {
    let form = this.form;
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      control.markAsDirty({ onlySelf: true });
      control.markAsTouched({ onlySelf: true });
    });
  }

  /**
   * Verificar se o formulário é válido
   */
  verificarValidadeForm(): boolean {
    if (!this.form.get('generic_input').valid) {
      return false;
    }
    return true;
  }

}
