import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "@models/dialog-data";
import {Foto, Repo} from "@models/aplicativo-item";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-modal-git',
  templateUrl: './modal-git.component.html',
  styleUrls: ['./modal-git.component.scss']
})
export class ModalGitComponent implements OnInit, OnDestroy {

  chosen: Repo[] = [];

  received: Repo[] = [];

  constructor(public dialogRef: MatDialogRef<ModalGitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Repo[]) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    // @ts-ignore
    this.received = this.data;
    console.log(this.data)
  }

  drop(event: CdkDragDrop<Repo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnDestroy(): void {
    console.log('OnDestroy do modal do git');
    this.received=null;
    this.chosen=null;
  }

}
