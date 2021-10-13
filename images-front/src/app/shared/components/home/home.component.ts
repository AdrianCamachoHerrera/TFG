import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentRef, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { UsersService } from '../../services/users.service';
import { NewImageComponent } from '../new-image/new-image.component';
import { PublicationDetailComponent } from '../publication-detail/publication-detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userid: string;
  imageidList: string[];
  imagesBaseURL: string;
  overlayRef: OverlayRef;
  ref: ComponentRef<NewImageComponent>;
  pubRef: ComponentRef<PublicationDetailComponent>;

  constructor(
    private usersService: UsersService,
    private imagesService: ImagesService,
    private overlay: Overlay
  ) {}

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');

    this.imagesBaseURL =
      'https://openfaas.adriancamachofaas.ml/function/download-image/';

    this.imagesService.getImages(this.userid).subscribe((data) => {
      this.imageidList = data;
    });
  }

  publicImage() {
    // We create the overlay
    const overlayRef = this.overlay.create({
      height: '70%',
      width: '60%',
    });
    //Then we create a portal to render a component
    const componentPortal = new ComponentPortal(NewImageComponent);
    // We add a custom CSS class to our overlay
    overlayRef.addPanelClass('overlay-new-image');
    //We render the portal in the overlay
    this.ref = overlayRef.attach(componentPortal);
    this.ref.instance.closePanel.subscribe(() => {
      overlayRef.detach();
      this.imagesService.getImages(this.userid).subscribe((data) => {
        this.imageidList = data;
      });
    });
  }

  publicationDetail(image: string){
      // We create the overlay
      const overlayRef = this.overlay.create({
        height: '75%',
        width: '60%',
      });
      //Then we create a portal to render a component
      const componentPortal = new ComponentPortal(PublicationDetailComponent);
      // We add a custom CSS class to our overlay
      overlayRef.addPanelClass('overlay-new-image');
      //We render the portal in the overlay
      this.pubRef = overlayRef.attach(componentPortal);
      this.pubRef.instance.image = image;
      this.pubRef.instance.closePanel.subscribe(() => {
        overlayRef.detach();
      });
  }

}

