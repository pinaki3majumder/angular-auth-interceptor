import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { AuthSelectionComponent } from './features/auth/components/auth-selection/auth-selection.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { loginRedirectGuard } from './core/guards/login-redirect.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginRedirectGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [loginRedirectGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: '',
        component: AuthSelectionComponent,
        pathMatch: 'full',
        canActivate: [loginRedirectGuard]
    }
];
