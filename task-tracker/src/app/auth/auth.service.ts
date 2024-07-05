import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'authToken';

  constructor(private router: Router) {}

  /**
   * Initialize the service
   * This method can be used to set initial states or perform startup logic.
   */
  initialize(): void {
    console.log('AuthService initialized');
    // Add any initialization logic here if needed.
  }

  /**
   * Simulate user registration
   * Replace this mock implementation with a real registration API call.
   * @param username - User's username
   * @param password - User's password
   * @returns boolean - Registration success status
   */
  register(username: string, password: string): boolean {
    if (username && password) {
      // Implement actual registration logic here
      return true;
    }
    return false;
  }

  /**
   * Simulate login and store the token in localStorage
   * Replace this mock implementation with a real authentication API call.
   * @param username - User's username
   * @param password - User's password
   * @returns boolean - Login success status
   */
  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') {
      const token = 'fake-jwt-token';
      localStorage.setItem(this.tokenKey, token);
      return true;
    }
    return false;
  }

  /**
   * Simulate logout and remove the token from localStorage
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']).catch(error => {
      console.error('Navigation error:', error); // Log any navigation errors
    });
  }

  /**
   * Check if the user is logged in
   * @returns boolean - User's login status
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Get the token from localStorage
   * @returns string | null - The stored token or null if not found
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
