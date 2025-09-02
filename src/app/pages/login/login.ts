import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { LoginModel } from '../model/Employee.model';
import { Employee } from '../../services/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  //Inject services
  employeeService = inject(Employee);
  router = inject(Router);
  //Define form group and model
  loginForm: FormGroup = new FormGroup({
    emailId: new FormControl(''),
    password: new FormControl(''),
  });
  loginData: LoginModel = new LoginModel();

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //spread operator to copy form values to loginData
      this.loginData = { ...this.loginForm.value };

      console.log('Login with:', this.loginData.emailId, this.loginData.password);

      this.employeeService.onLogin(this.loginData).subscribe({
        next: (res: any) => {
          console.log('Login successful', res);
          if (res.result) {
            localStorage.setItem('leaveUser', JSON.stringify(res.data));
            this.router.navigateByUrl('/dashboard');
          } else {
            alert('Invalid login credentials');
          }
        },
        error: (err) => {
          alert(`API Error ${JSON.stringify(err)}`);
        },
      });
    } else {
      console.log('Form invalid');
    }
  }
}
