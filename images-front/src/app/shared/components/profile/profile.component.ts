import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { UsersService } from '../../services/users.service';
import { NewImageComponent } from '../new-image/new-image.component';
import { PublicationDetailComponent } from '../publication-detail/publication-detail.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  pubRef: ComponentRef<PublicationDetailComponent>;
  imageidList: string[];
  imagesBaseURL: string;
  overlayRef: OverlayRef;
  private userid: string;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private imagesService: ImagesService,
    private overlay: Overlay
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.userid = params['id'];
      this.imagesService.getImages(this.userid).subscribe((data) => {
        this.imageidList = data;
      });
    });

    this.imagesBaseURL =
      'https://openfaas.adriancamachofaas.ml/function/download-image/';
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


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
