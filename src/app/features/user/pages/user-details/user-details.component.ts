import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../user';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatListModule, 
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsComponent {
  user!: User;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
    if (!this.user) {
      this.router.navigate(['/users']);
    }
  }
}
