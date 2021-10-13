import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImagesService } from 'src/app/shared/services/images.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-changue-avatar',
  templateUrl: './changue-avatar.component.html',
  styleUrls: ['./changue-avatar.component.css'],
})
export class ChangueAvatarComponent implements OnInit {
  @Output() closePanel = new EventEmitter<void>();

  filePath: string;
  myForm: FormGroup;
  file: File;
  userid: string;

  constructor(
    public fb: FormBuilder,
    private imageService: ImagesService,
    private usersService: UsersService
  ) {
    this.myForm = this.fb.group({
      img: [null],
      filename: [''],
    });
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.file = null;
  }

  imagePreview(e: any) {
    this.file = (e.target as HTMLInputElement).files[0];

    this.myForm.patchValue({
      img: this.file,
    });

    this.myForm.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  submit() {
    this.imageService
      .uploadImage(this.file, this.userid, true, 'avatar')
      .subscribe(
        (res) => {
          let avatar = res.id;
          this.usersService.patch(this.userid, { avatar }).subscribe(
            (data) => {this.closePanel.emit();},
            (err) => {}
          );
        },
        (err) => {}
      );
  }

}
