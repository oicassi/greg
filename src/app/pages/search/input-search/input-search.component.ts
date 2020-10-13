import { Subject } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  @Input()bounceTime: number;
  @Input()keyupCallback: Function;
  @Input()submitCallback: Function;
  @Input()preTerm: string;
  @Output()term = new EventEmitter<string>()
  @Output()submit = new EventEmitter<string>()

  private searchTerm = new Subject<string>();
  private finalSearchTerm = '';

  constructor() { }

  /**
   * Faz um subscribe do termo buscado e o passa para uma
   * callback ou então para o Output
   */
  ngOnInit(): void {
    this.searchTerm.pipe(
      debounceTime(this.bounceTime || 300),
      distinctUntilChanged(),
    ).subscribe((searchTerm: string) => {
      this.finalSearchTerm = searchTerm;
      if (this.keyupCallback) {
        this.keyupCallback(searchTerm);
      } else {
        this.term.emit(searchTerm);
      }
    })
  }

  /**
   * Processa o termo buscado no input
   * @param term Termo digitado
   */
  search(term: string): void {
    this.searchTerm.next(term);
  }

  /**
   * Submit do termo digitado no input
   */
  submitSearch(): void {
    if (this.submitCallback) {
      this.submitCallback(this.finalSearchTerm);
    } else {
      this.submit.emit(this.finalSearchTerm);
    }
  }

}
