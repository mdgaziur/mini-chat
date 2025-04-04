import {Component, inject} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-login',
  host: {
    class: 'h-full flex-1 flex flex-col items-center justify-center',
  },
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(Auth);
  btn_img = "google_signin_button.png";

  async handleSignin() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  onMousedown() {
    this.btn_img = "google_signin_button_pressed.png";
  }

  onMouseup() {
    this.btn_img = "google_signin_button.png";
  }
}
