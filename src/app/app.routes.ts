import { Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            
        ]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signin',
                component: SigninComponent
            }
        ]
    },
    {
        path: 'board',
        component: BoardComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
