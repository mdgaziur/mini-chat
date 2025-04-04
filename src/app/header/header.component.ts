import {Component, inject, OnDestroy} from '@angular/core';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnDestroy {
  auth = inject(Auth);

  isLoggedIn: boolean = false;
  authStateUnsubscribe = this.auth.onAuthStateChanged(authState => {
    this.isLoggedIn = !!authState;
  })

  handleSignout() {
    this.auth.signOut();
  }

  ngOnDestroy() {
    this.authStateUnsubscribe();
  }
}
