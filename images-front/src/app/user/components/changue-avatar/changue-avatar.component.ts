import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/shared/services/images.service';
import { UsersService } from 'src/app/shared/services/users.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-changue-avatar',
  templateUrl: './changue-avatar.component.html',
  styleUrls: ['./changue-avatar.component.css']
})
export class ChangueAvatarComponent implements OnInit {

  userid: string;
  avatarid: string;
  selectedFile: ImageSnippet;

  constructor( private usersService: UsersService, private imageService: ImagesService ){}


  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
  }


  
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(file);
      this.imageService.uploadImage(this.selectedFile.file, this.userid, true, 'avatar').subscribe(
        (res) => {
          let avatar = res.id;
          this.usersService.patch(this.userid, {avatar}).subscribe(
            data => {
      
            },
            err => {
      
            }
          );
  
        },
        (err) => {
        
        })
        
    });

    reader.readAsDataURL(file);
  }

}
