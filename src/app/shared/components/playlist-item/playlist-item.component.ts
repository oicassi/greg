import { Audio } from '@models/aplicativo-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  @Input() audio: Audio;

  constructor() { }

  ngOnInit() {
  }

}
