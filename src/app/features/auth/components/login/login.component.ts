import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthRepositoryService } from '../../services/auth-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LOGIN_FORM_VALUES, LOGIN_RESPONSE } from '../../models/login.type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthRepositoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      username: ['emilys', Validators.required],
      password: ['emilyspass', Validators.required]
    });
  }

  loginSubmit() {
    const formVal: LOGIN_FORM_VALUES = this.form.getRawValue();
    console.log('login clicked');

    formVal.expiresInMins = 1;
    
    this.auth.login(formVal).subscribe({
      next: (res: LOGIN_RESPONSE) => {
        console.log('LOGIN res-', res, this.form.valid);

        if (res) {
          this.form.reset();
          localStorage.setItem('userData', JSON.stringify(res));
          this.router.navigateByUrl('/dashboard');
        } else {
          console.log('LOGIN DATA NOT FOUND ERROR');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log('LOGIN ERROR-', err);
      }
    });
  }
}
