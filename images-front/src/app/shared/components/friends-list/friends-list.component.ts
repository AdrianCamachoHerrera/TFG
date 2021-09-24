import { Component, OnInit } from '@angular/core';
import { Friend } from '../../model/Friend';
import { FunctionsService } from '../../services/functions.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css'],
})
export class FriendsListComponent implements OnInit {
  friends: Friend[];
  userid: string;
  img: string;

  constructor(private functionsService: FunctionsService) {}

  ngOnInit(): void {

    this.img = 'https://openfaas.adriancamachofaas.ml/function/download-image/';

    this.userid = localStorage.getItem('userid');
    const user = this.userid;
    this.functionsService.getFriends({ user }).subscribe((data) => {
      this.friends = data;
      console.log(data);
    });
  }
}
