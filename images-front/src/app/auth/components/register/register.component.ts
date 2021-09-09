import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from './utils/validation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private usersService: UsersService, private router: Router) { 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ],

        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
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
    const { username, name, password, confirmPassword } = this.form.value;

    this.usersService.register(username, name, password).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log("ERROR");
      }
    );
  }

}
