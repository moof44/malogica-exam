import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for managing user data.
 */
export class UserService {

  /**
   * Base URL for the user API.
   */
  url = 'https://jsonplaceholder.typicode.com/users';

  /**
   * Constructor for UserService.
   * @param http - Injected HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves a list of all users.
   * @returns An Observable that emits an array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  /**
   * Retrieves a single user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns An Observable that emits a User object.
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

}
