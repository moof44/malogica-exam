import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.#url);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.#url}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.#url, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.#url}/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.#url}/${id}`);
  }

}
