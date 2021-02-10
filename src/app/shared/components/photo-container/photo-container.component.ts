import { Foto } from '@models/aplicativo-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-container',
  templateUrl: './photo-container.component.html',
  styleUrls: ['./photo-container.component.scss']
})
export class PhotoContainerComponent implements OnInit {

  @Input() photoArray: Foto[];
  @Input() fgColor: string;

  imagens: Array<ImageSlide>
  constructor() { }

  ngOnInit() {
    this.imagens = this.photoArray.map(photo => {
      let img = new ImageSlide();
      img.title = photo.name;
      img.alt = photo.name;
      img.image = photo.url;
      img.thumbImage = photo.url;
      return img;
    })
  }

}

export class ImageSlide {
  image: string;
  thumbImage: string;
  alt: string;
  title: string;
}