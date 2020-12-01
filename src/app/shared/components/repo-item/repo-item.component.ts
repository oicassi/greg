import { Repo } from '@models/aplicativo-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-repo-item',
  templateUrl: './repo-item.component.html',
  styleUrls: ['./repo-item.component.scss']
})
export class RepoItemComponent implements OnInit {

  @Input() repo: Repo;
  @Input() fgColor: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Retorna as cores customizadas para o card
   */
  customStyle(): any {
    const fgColor = this.fgColor || '#444444';

    const mainCard = {
      border:`2px solid ${fgColor}`,
      color: fgColor
    }

    const headerBorder = {
      'border-bottom': `1px solid ${fgColor}`
    }

    const footerBorder = {
      'border-top': `1px solid ${fgColor}`
    }

    return {
      mainCard,
      headerBorder,
      footerBorder
    }
  }
}
