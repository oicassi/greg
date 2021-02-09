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

  chosen: any[] = [];

  received: any[] = [];

  metadataChosen: any[] = [];

  metadataReceived: any[] = [];

  constructor(public dialogRef: MatDialogRef<ModalAplicativoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {content: DialogData<Repo[] | Foto[] >, metadata: any[]} ) {
    this.chosen=[];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    // @ts-ignore
    this.received = this.data.content;
    this.metadataReceived = this.data.metadata;
    this.chosen=[];
    this.metadataChosen = [];
    console.log(this.data)

  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chosen, event.previousIndex, event.currentIndex);
  }

  addElement(item: Repo | Foto, i: number) {
    // @ts-ignore
    this.chosen.push(item);
    this.received = this.received.filter(elemento => elemento.name != item.name);
    this.metadataChosen.push(this.metadataReceived[i]);
    this.metadataReceived = this.metadataReceived.filter(el => el.secretId != this.metadataReceived[i].secretId);
  }

  removeElement(item: Repo | Foto, i:number){
    // @ts-ignore
    this.received.unshift(item);
    this.metadataReceived.unshift(this.metadataChosen[i]);
    this.chosen = this.chosen.filter(elemento => elemento.name != item.name);
    this.metadataChosen = this.metadataChosen.filter(el => el.secretId != this.metadataChosen[i].secretId);
  }

  lookAtThisPhotograph(str: string): boolean {
    //console.log(str.includes("www.github"))
    return !str.includes("flickr");
  }

  getModalData() {
    return {chosen: this.chosen, metadataChosen: this.metadataChosen};
  }
}
