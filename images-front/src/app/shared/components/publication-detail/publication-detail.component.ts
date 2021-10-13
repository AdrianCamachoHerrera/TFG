import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FunctionsService } from '../../services/functions.service';
import { ImagesService } from '../../services/images.service';
import {Comment} from '../../model/Comment'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css']
})
export class PublicationDetailComponent implements OnInit {
  @Input() image: string;
  @Output() closePanel = new EventEmitter<void>();
  userid: string;
  public comments: Comment[];
  title: string;

  constructor( private functionService: FunctionsService, private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem("userid");
    const image: string = this.image;
    this.functionService.getComments({image}).subscribe((data) => {
      this.comments = data;
    });
    this.imagesService.getImage(image).subscribe((data) => {
      this.title = data.description;
      console.log(this.title);
    });
  }

  onSubmit(f: NgForm){
    const {text} = f.value;
    const image: string = this.image;
    const author: string = this.userid;
    this.functionService.postComment({text, author, image}).subscribe((res) => {  
     this.comments.splice(0, 0, res);
    });

  }

  back(){
    this.closePanel.emit();
  }

}
