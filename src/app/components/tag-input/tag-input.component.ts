import {Component, Input, OnInit} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {TagService} from "@services/tags.service";
import {AlertService} from "@shared-components/alert/alert.service";
import {GenericResponse} from "@models/responses/generic-response";
import {UserService} from "@services/user.service";
import {AuthenticationService} from "@services/authentication.service";

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {

  constructor(
    private tagService:TagService,
    private alertService: AlertService,
    private userService: UserService,
    private authService: AuthenticationService
              ) { }

  ngOnInit() {
    console.log('[TAG-INPUT] ngOnInit')
    console.log(this.authService.currentUserValue)
    this.tags = this.authService.currentUserValue.tags.map(tag => {
      return {name: tag}
    });
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

//  @Input() tags: Tag[];


  tags: Tag[] = [
    {name: 'Fotógrafo'},
    {name: 'P&B'},
    {name: 'Web Designer'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({name: value.trim().toUpperCase()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  sendTags(){
    let tagsJson: string[];
    tagsJson = [];
    this.tags.forEach(element => {
      tagsJson.push(element.name);
    });

    if(tagsJson.length > 0){
      this.tagService
          .addTags(tagsJson)
          .subscribe(result =>{
        console.log(result);
        this.authService.currentUserValue.tags = tagsJson.map(tag => tag.toUpperCase())
        // this.authService.getUser();
        this.alertService.success("Tags inseridas com sucesso ")
      });
    }
  }
}


