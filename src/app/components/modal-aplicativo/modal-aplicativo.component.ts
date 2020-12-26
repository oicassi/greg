import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "@models/dialog-data";
import {Foto, Repo} from "@models/aplicativo-item";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";


@Component({
  selector: 'app-modal-aplicativo',
  templateUrl: './modal-aplicativo.component.html',
  styleUrls: ['./modal-aplicativo.component.scss']
})
export class ModalAplicativoComponent implements OnInit {

  chosen: Repo[] | Foto[] = [];

  received: Repo[] | Foto[] = [];

  constructor(public dialogRef: MatDialogRef<ModalAplicativoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData<Repo[] | Foto[]>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    // @ts-ignore
    this.received = this.data;
    console.log(this.data)
  }

  drop(event: CdkDragDrop<Repo[] | Foto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
