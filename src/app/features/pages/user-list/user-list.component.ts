import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { catchError, finalize, map, of, throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatButtonModule, 
    RouterLink,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = signal(true);
  error = signal(false); // Flag to track error state

  constructor(private userService: UserService, private router: Router) { } // Inject Router


  ngOnInit(): void {
    this.simulateFirstRequestFailure();
  }

  getUsers(): void {
    this.loading.set(true);
    this.error.set(false); // Reset error state on retry

    this.userService.getUsers()
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          this.error.set(true);
          return throwError(() => error); // Re-throw the error to trigger the error callback
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
      next: (users) => {
        console.log('users', users)
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  simulateFirstRequestFailure() {
    // Force the first request to fail
    of(null).pipe(
      map(() => {
        throw new Error('Simulated first request failure');
      }),
      catchError(() => {
        return throwError(() => new Error('Simulated first request failure'));
      }),
      finalize(() => this.loading.set(false))
    ).subscribe({
      error: (error) => {
        console.error('First request failed as expected:', error);
        this.error.set(true); 
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Method to retry fetching users
  retryGetUsers() {
    this.getUsers();
  }

  goToUserDetails(user: User) { 
    // Navigate to the details page and pass the user data
    this.router.navigate(['/users', user.id], { state: { user } });
  }
}
