import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userId: [''],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      contactNumber: ['', Validators.required],
      role: ['user'],
      token: [''],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.value).subscribe(
        (res: any) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 5000,
          });
          this.signupForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: "Something's wrong",
            duration: 5000,
          });
        }
      );
    } else {
      console.log('Invalid form');
      ValidateForm.validateAllFormFields(this.signupForm);
      alert('Your form is invalid, please check again!');
    }
  }
}
