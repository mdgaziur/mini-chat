import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Auth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  auth = inject(Auth)

  constructor(private router: Router) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        if (this.router.url !== '/chat') {
          this.router.navigate(['/chat']);
        }
      }
      else {
        this.router.navigate(['/']);
      }
    })
  }
}
