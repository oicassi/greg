import { Audio } from '@models/aplicativo-item';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-playlist-container',
  templateUrl: './playlist-container.component.html',
  styleUrls: ['./playlist-container.component.scss']
})
export class PlaylistContainerComponent implements OnInit {

  @Input() audioArray: Audio[];
  @Output() audioSelecionado: EventEmitter<Audio> = new EventEmitter<Audio>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Callback ao clicar no áudio da playlist
   * @param audio Audio selecionado
   */
  onAudioSelecionado(audio: Audio): void {
    this.audioSelecionado.emit(audio);
  }
}
