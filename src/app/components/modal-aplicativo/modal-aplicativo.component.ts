import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "@models/dialog-data";
import {Foto, Repo} from "@models/aplicativo-item";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {log} from "util";


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
    this.chosen=[];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    // @ts-ignore
    this.received = this.data;
    this.chosen=[];
    console.log(this.data)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chosen, event.previousIndex, event.currentIndex);
  }

  addElement(item: Repo | Foto) {
    // @ts-ignore
    this.chosen.push(item);
    this.received = this.received.filter(elemento => elemento.name != item.name);
  }

  removeElement(item: Repo | Foto){
    // @ts-ignore
    this.received.unshift(item);
    this.chosen = this.chosen.filter(elemento => elemento.name != item.name);
  }

  lookAtThisPhotograph(str : string): boolean {
    //console.log(str.includes("www.github"))
    return str.includes("github.com");
  }

}
