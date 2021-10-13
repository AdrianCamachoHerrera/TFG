import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FunctionsService } from '../../services/functions.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from '../../services/images.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css'],
})
export class NewImageComponent implements OnInit {
  @Output() closePanel = new EventEmitter<void>();

  imageToShow: any;
  uploadForm: FormGroup;
  filterImage: File;
  form: FormGroup;
  userid: string;

  constructor(
    public fb: FormBuilder,
    private functionService: FunctionsService,
    private imageService: ImagesService
  ) {
    // Reactive Form
    this.uploadForm = this.fb.group({
      image: [null],
      title: [''],
    });

    this.form = this.fb.group({
      filter: ['no', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.filterImage = null;
  }

  handleChange() {
    let function_name: string = 'no';
    let image: File = this.uploadForm.value.image;

    switch (this.form.value.filter) {
      case 'bw':
        function_name = 'bw-image';
        break;
      case 'gs':
        function_name = 'gs-image';
        break;
      case 'invert':
        function_name = 'invert-image';
        break;
      case 'paint':
        function_name = 'painting-image';
        break;
      default:
        break;
    }

    if (function_name != 'no') {
      this.functionService.filterImage(function_name, image).subscribe(
        (data) => {
          const imgBlob: Blob = data.body;
          const imgFile = new File([imgBlob], 'image.jpg', {
            type: 'image/jpeg',
          });
          this.filterImage = imgFile;
          this.createImageFromBlob(data.body);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('NO FILTER');
      this.createImageFromBlob(image);
    }

    this.uploadForm.get('image').updateValueAndValidity();
  }

  // Image Preview
  showPreview(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.functionService.pepareImage(file).subscribe(
      (data) => {
        const imgBlob: Blob = data.body;
        const imgFile = new File([imgBlob], 'image.jpg', {
          type: 'image/jpeg',
        });
        this.filterImage = imgFile;
        this.createImageFromBlob(imgBlob);
        this.uploadForm.patchValue({
          image: imgFile,
        });
      },
      (err) => {
        console.log(err);
      }
    );

    this.uploadForm.get('image').updateValueAndValidity();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  // Submit Form
  submit() {
    let image: File = this.filterImage;
    let title: string = "OpenFaaS painting";
    this.imageService.uploadImage(image, this.userid, false, title).subscribe(
      (res) => {this.closePanel.emit();},
      (err) => {}
    );
  }
}
