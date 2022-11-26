import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-log-in-sign-up',
  templateUrl: './log-in-sign-up.component.html',
  styleUrls: ['./log-in-sign-up.component.css'],
})
export class LogInSignUpComponent implements OnInit {
  infoClass = 'container';
  logINform: any = FormGroup;
  signUPform: any = FormGroup;
  next: String = '/';
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private routeAct: ActivatedRoute,
    private userAuth:UsersService,
  ) {}

  ngOnInit(): void {
     this.next = this.routeAct.snapshot.params['nextURL'];
    this.logINform = this.formBuilder.group({
      email: [null],
      password: [null],
    });
    this.signUPform = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      phone: [null],
      birthDate: [null],
      password: [null],
      uniqueNum:[null]
    });
  }

  moveSignUp() {
    this.infoClass = 'container right-panel-active';
  }
  moveSignIn() {
    this.infoClass = 'container ';
  }
  login() {
    var formValues = this.logINform.value;
    var loginData = {
      email: formValues.email,
      password: formValues.password,
    };
    
    this.userAuth.login(loginData).subscribe((res: any) => {
      if (res != null) {
        console.log(res);
        localStorage.setItem('user_web_token', res.token);
        this.route.navigate(["/"]);
      }
    });
  }

  sigup() {
    var formValues = this.signUPform.value;
    var userData = {
      userFirstName: formValues.firstName,
      userLastName: formValues.lastName,
      userEmail: formValues.email,
      userPhone: formValues.phone,
      userBirthDate: formValues.birthDate,
      userPassword: formValues.password,
      userUniqueNum:formValues.uniqueNum
    };

    this.userAuth.Sigup(userData).subscribe((res: any) => {
      if (res != null) { 
        this.route.navigate([this.next]);
      }
    });
  }
}
