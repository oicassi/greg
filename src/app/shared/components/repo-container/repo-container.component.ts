import { Repo } from '@models/aplicativo-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-container',
  templateUrl: './repo-container.component.html',
  styleUrls: ['./repo-container.component.scss']
})
export class RepoContainerComponent implements OnInit {

  @Input() repoArray: Repo[];
  @Input() fgColor: string;

  constructor() { }

  ngOnInit() {
  }
}