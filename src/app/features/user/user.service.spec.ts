import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './user'; // Make sure you have the User interface defined

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import for mocking HTTP requests
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    const mockUsers: User[] = [
      { 
        id: 1, 
        name: 'John Doe', 
        username: 'johndoe', 
        email: 'john@example.com', 
        phone: '1234567890',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          zipcode: '12345',
          suite: '',
          geo: {
            lat: '0',
            lng: '0'
          }
        },
        website: 'https://www.johndoe.com',
        company: {
          name: 'Acme Corp',
          catchPhrase: 'We make things!',
          bs: ''
        } 
      },
      { 
        id: 2, 
        name: 'Jane Doe', 
        username: 'JaneDoe', 
        email: 'Jane@example.com', 
        phone: '1234567890',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          zipcode: '12345',
          suite: '',
          geo: {
            lat: '0',
            lng: '0'
          }
        },
        website: 'https://www.johndoe.com',
        company: {
          name: 'Acme Corp',
          catchPhrase: 'We make things!',
          bs: ''
        } 
      },
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(service.url); // Expect a GET request to the specified URL
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // Provide the mock data as a response
  });

  it('should get a single user by id', () => {
    const userId = 1;
    const mockUser: User =       { 
      id: 1, 
      name: 'John Doe', 
      username: 'johndoe', 
      email: 'john@example.com', 
      phone: '1234567890',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        zipcode: '12345',
        suite: '',
        geo: {
          lat: '0',
          lng: '0'
        }
      },
      website: 'https://www.johndoe.com',
      company: {
        name: 'Acme Corp',
        catchPhrase: 'We make things!',
        bs: ''
      } 
    };

    service.getUser(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service.url}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});