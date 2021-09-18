import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from './utils/validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  userid: string;
  form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private usersService: UsersService, private router: Router) { 
  }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.form = this.formBuilder.group(
      {
        oldpassword: [
          '',
          [
            Validators.required
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50)
          ]
        ],

        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(){
    this.submitted = true;
    const { oldpassword, password } = this.form.value;

    const userid = this.userid;
    console.log(userid);

    this.usersService.changuePassword({userid, oldpassword, password}).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log("ERROR");
      }
    );
  }

}
