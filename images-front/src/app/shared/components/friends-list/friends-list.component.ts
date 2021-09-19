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

  constructor(private functionsService: FunctionsService) {
    
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    const user = this.userid;
    this.functionsService.getFriends({user}).subscribe(
      data => {
        this.friends = data;
        console.log(data);
       }
    );

  }
}
