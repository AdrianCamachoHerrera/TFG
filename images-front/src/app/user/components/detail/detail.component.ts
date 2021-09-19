import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/model/User';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  user!: User;
  userid!: string;
  img: string;
;

  constructor( private usersService: UsersService) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');

    this.usersService.find(this.userid).subscribe(
      data => {
       this.user = data;
       this.img = 'https://openfaas.adriancamachofaas.ml/function/download-image/' + this.user.avatar; 
      }
    );

  }

}
