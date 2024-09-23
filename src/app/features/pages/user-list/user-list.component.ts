import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { catchError, finalize, map, of, throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  loading = signal(true);
  error = signal(false); // Flag to track error state

  constructor(private userService: UserService, private router: Router, private cdr: ChangeDetectorRef) {
    this.loading.set(true); // Set loading to true initially
    effect(() => {
      this.cdr.detectChanges();
      if (!this.loading() && this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  } // Inject Router

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<User>([]);
    this.simulateFirstRequestFailure();
  }

  getUsers(): void {
    this.loading.set(true);
    this.error.set(false); // Reset error state on retry

    this.userService
      .getUsers()
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (users) => {
          //this.dataSource.data = users;
          this.dataSource.data = users;
        },
      });
  }

  simulateFirstRequestFailure() {
    // Force the first request to fail
    of(null)
      .pipe(
        map(() => {
          throw new Error('Simulated first request failure');
        }),
        catchError((error) => {
          console.error('First request failed as expected:', error);
          this.error.set(true);
          return of(null); 
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        error: (error) => {
          console.error('First request failed as expected:', error);
          this.error.set(true);
        },
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
