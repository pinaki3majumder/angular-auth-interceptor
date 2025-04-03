import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRepositoryService } from '../../services/auth-repository.service';
import { REGISTER_FORM_CONTROLS, REGISTER_FORM_VALUES } from '../../models/register.type';
import { USER } from '../../models/user.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public regForm!: FormGroup<REGISTER_FORM_CONTROLS>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthRepositoryService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.regForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  regFormSubmit() {
    const formVal: REGISTER_FORM_VALUES = this.regForm.getRawValue();

    console.log('REG FORM SUBMIT', formVal);

    this.auth.registerUser(formVal).subscribe({
      next: (res: USER) => {
        console.log('REG RES -', res);

        if (res && res.username) {
          this.regForm.reset();
          this.route.navigateByUrl('/login');
        } else {
          console.log('REG DATA NOT FOUND ERROR');

        }
      },
      error: (err) => {
        console.log('REG err -', err);

      }
    });
  }

}
