import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-selection',
  standalone: true,
  imports: [],
  templateUrl: './auth-selection.component.html',
  styleUrl: './auth-selection.component.css'
})
export class AuthSelectionComponent {
  route = inject(Router);

  login(): void {
    this.route.navigateByUrl('/login');
  }
  register(): void {
    this.route.navigateByUrl('/register');
  }
}
