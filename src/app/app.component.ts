import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserStore } from './features/user/user.store';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    AuthService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly #authService = inject(AuthService);
  readonly router = inject(Router);

  isLoggedIn = this.#authService.isLoggedIn;
  title = 'malogica-exam';

  logout(){
    this.#authService.userStore.logoutUser();
    this.router.navigate(['/login']);
  }
}
