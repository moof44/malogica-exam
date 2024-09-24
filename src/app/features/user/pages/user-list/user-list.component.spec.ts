// user-list.component.spec.ts

import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // For Material components
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { UserService } from '../../user.service';
import { User } from '../../user';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
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
        FormsModule,
        NoopAnimationsModule,
        UserListComponent,
      ],
      providers: [{ provide: UserService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user data and paginator on successful request', fakeAsync(() => {
    const mockUsers: User[] = [
      /* ... your mock user data */
    ];
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));

    component.getUsers();
    tick();
    fixture.detectChanges();

    const table = debugElement.query(By.css('mat-table'));
    const paginator = debugElement.query(By.css('mat-paginator'));

    expect(table).toBeTruthy();
    expect(paginator).toBeTruthy();
    expect(component.dataSource.data.length).toBe(mockUsers.length);
  }));

  // ... (other imports and test setup)

  it('should apply filter and reset paginator', fakeAsync(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 2,
        name: 'Jane Doe',
        username: 'Jane',
        email: 'Bro@example.com',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
      {
        id: 3,
        name: 'Bro Doe',
        username: 'Bro',
        email: 'Bro@example.com',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));

    component.getUsers();
    tick();
    fixture.detectChanges();

    // Simulate a filter event
    const inputElement = debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'john';
    inputElement.triggerEventHandler('keyup', {
      target: inputElement.nativeElement,
    });
    fixture.detectChanges();

    expect(component.dataSource.filter).toBe('john'); // Filter should be applied

    // If paginator is available, check if it's reset to the first page
    if (component.dataSource.paginator) {
      expect(component.dataSource.paginator.pageIndex).toBe(0);
    }
  }));

});
