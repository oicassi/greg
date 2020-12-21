import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {OrderListModule} from 'primeng/orderlist';
import {ToastModule} from 'primeng/toast';
import {GalleriaModule} from 'primeng/galleria';
import {CardModule} from 'primeng/card';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ResumoComponent} from './resumo/resumo.component';
import {GithubComponent} from './github/github.component';
import {FreesoundComponent} from './freesound/freesound.component';
import {FlickrComponent} from './flickr/flickr.component';
import {PreviewComponent} from './preview.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarModule} from 'primeng/sidebar';


@NgModule({
  declarations: [
    FlickrComponent,
    FreesoundComponent,
    GithubComponent,
    PreviewComponent,
    ResumoComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    CardModule,
    GalleriaModule,
    OrderListModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    SidebarModule,
  ],
  exports: [
    PreviewComponent,
    FlickrComponent,
    FreesoundComponent,
    GithubComponent,
    PreviewComponent,
    ResumoComponent
  ]
})
export class PreviewModule {
}
