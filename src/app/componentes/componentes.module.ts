import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ComponentesComponent } from './componentes.component';
import { FlickrliteComponent } from './flickrlite/flickrlite.component';
import { FreesoundliteComponent } from './freesoundlite/freesoundlite.component';
import { GithubliteComponent } from './githublite/githublite.component';
import { ResumoliteComponent } from './resumolite/resumolite.component';



@NgModule({
  declarations: [
    FlickrliteComponent,
    FreesoundliteComponent,
    GithubliteComponent,
    ResumoliteComponent,
    ComponentesComponent,
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    FormsModule 
  ],
  exports:[
    ComponentesComponent

  ]
})
export class ComponentesModule { }
