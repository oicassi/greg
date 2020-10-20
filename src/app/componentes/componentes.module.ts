import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FreesoundliteComponent } from './freesoundlite/freesoundlite.component';
import { FlickrliteComponent } from './flickrlite/flickrlite.component';
import { ComponentesComponent } from './componentes.component';
import { ResumoliteComponent } from './resumolite/resumolite.component';
import { GithubliteComponent } from './githublite/githublite.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



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
    ToastModule,
    FormsModule 
  ],
  exports:[
    ComponentesComponent

  ]
})
export class ComponentesModule { }
