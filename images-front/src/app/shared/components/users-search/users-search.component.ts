import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { defer, merge, Observable, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  share,
  switchMap
} from "rxjs/operators";
import { UserSearch } from '../../model/UserSearch';
import { UsersService } from '../../services/users.service';
import { FriendsListComponent } from '../friends-list/friends-list.component';

@Component({
  selector: 'app-users-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.css']
})
export class UsersSearchComponent implements OnInit {
  public searchControl: FormControl;
  public searchResults$: Observable<UserSearch[]>;
  public areMinimumCharactersTyped$: Observable<boolean>;
  public areNoResultsFound$: Observable<boolean>;
  private userid: string;
  private friends: string[];
  
  constructor(private usersService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.userid = localStorage.getItem("userid");
    this.usersService.find(this.userid).subscribe((data) => {
      this.friends = data.friends;
    });

    this.searchControl = this.formBuilder.control("");

    this.areMinimumCharactersTyped$ = this.searchControl.valueChanges.pipe(
      map(searchString => searchString.length >= 3)
    );

    const searchString$ = merge(
      defer(() => of(this.searchControl.value)),
      this.searchControl.valueChanges
    ).pipe(
      debounceTime(1000),
      distinctUntilChanged()
    );

    this.searchResults$ = searchString$.pipe(
      switchMap((searchString: string) =>
        this.usersService.search(searchString)
      ),
      share()
    );

    this.areNoResultsFound$ = this.searchResults$.pipe(
      map(results => results.length === 0)
    );
  }

  addFriend(id: string){
    this.friends.push(id);
    this.usersService.patch(this.userid, {friends: this.friends}).subscribe(
      data => {
        
      },
      err => {

      }
    );
  }

  notFriends(id: string): boolean{
    return !this.friends.includes(id) && !(this.userid == id);
  }

}
