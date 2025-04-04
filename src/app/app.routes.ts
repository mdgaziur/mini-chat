import { Routes } from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: LoginComponent,
  }
];
