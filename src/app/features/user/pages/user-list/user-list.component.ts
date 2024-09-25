import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { catchError, finalize, map, of } from 'rxjs';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { UserStore } from '../../user.store';
import { MediaMatcher } from '@angular/cdk/layout';

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
  userStore = inject(UserStore);

  displayedColumns = signal(['id', 'name', 'email', 'phone', 'actions']);
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  loading = signal(true);
  error = signal(false); // Flag to track error state

  mobileQuery: MediaQueryList;
  smallScreenQuery!: MediaQueryList; 

  private mobileQueryListener: () => void;
  private smallScreenQueryListener!: () => void;


  constructor(private userService: UserService, private router: Router, private cdr: ChangeDetectorRef, private media: MediaMatcher) {
    this.loading.set(true); // Set loading to true initially

    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');
    this.smallScreenQuery = this.media.matchMedia('(max-width: 425px)'); 

    this.mobileQueryListener = () => {
      this.checkScreenWidth();
      this.cdr.detectChanges();
    };

    this.smallScreenQueryListener = () => {
      this.checkScreenWidth();
      this.cdr.detectChanges();
    };

    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.smallScreenQuery.addEventListener('change', this.smallScreenQueryListener); 
    this.checkScreenWidth();

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
    if(this.userStore.isFirstRetry()) this.getUsers();
    else this.simulateFirstRequestFailure();
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
    this.userStore.setFirstRetry();
  }

  goToUserDetails(user: User) {
    // Navigate to the details page and pass the user data
    this.router.navigate(['/users', user.id], { state: { user } });
  }

  checkScreenWidth() {
    if (this.smallScreenQuery.matches) { 
      this.displayedColumns.set(['id', 'name', 'email']); 
    } else if (this.mobileQuery.matches) {
      this.displayedColumns.set(['id', 'name', 'email', 'phone']); 
    } else {
      this.displayedColumns.set(['id', 'name', 'email', 'phone', 'actions']); 
    }
  }
}
