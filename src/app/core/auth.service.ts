import { inject, Injectable } from '@angular/core';
import { UserStore } from '../features/user/user.store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userStore = inject(UserStore);
  isLoggedIn = this.userStore.isLoggedIn;

  constructor() { }

  

}
