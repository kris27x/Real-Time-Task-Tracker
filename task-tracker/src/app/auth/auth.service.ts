import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  constructor(private router: Router) {}

  // Simulate login and store the token in localStorage
  login(username: string, password: string): boolean {
    // This is a mock implementation. Replace with a real authentication API call.
    if (username === 'user' && password === 'password') {
      const token = 'fake-jwt-token';
      localStorage.setItem(this.tokenKey, token);
      return true;
    }
    return false;
  }

  // Simulate logout and remove the token from localStorage
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
