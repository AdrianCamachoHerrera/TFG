import { Component, ComponentRef, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/model/User';
import { Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ChangueAvatarComponent } from '../changue-avatar/changue-avatar.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user!: User;
  userid!: string;
  img: string;

  ref: ComponentRef<ChangueAvatarComponent>;

  constructor( private usersService: UsersService, private overlay: Overlay ) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');

    this.usersService.find(this.userid).subscribe(
      data => {
       this.user = data;
       this.img = 'https://openfaas.adriancamachofaas.ml/function/download-image/' + this.user.avatar; 
      }
    );

  }

  onSubmit(f: NgForm){
    const { username, name } = f.value;

    this.usersService.patch(this.userid, {username, name}).subscribe(
      data => {

      },
      err => {

      }
    );
  }

  editImage() {
    // We create the overlay
    const overlayRef = this.overlay.create({
      height: '50%',
      width: '40%',
    });
    //Then we create a portal to render a component
    const componentPortal = new ComponentPortal(ChangueAvatarComponent);
    // We add a custom CSS class to our overlay
    overlayRef.addPanelClass("overlay");
    //We render the portal in the overlay
    this.ref = overlayRef.attach(componentPortal);
    this.ref.instance.closePanel.subscribe(() => {
      overlayRef.detach();
      this.usersService.find(this.userid).subscribe(
        data => {
         this.user = data;
         this.img = 'https://openfaas.adriancamachofaas.ml/function/download-image/' + this.user.avatar; 
        }
      );
    } 
    );
    
  }

}
