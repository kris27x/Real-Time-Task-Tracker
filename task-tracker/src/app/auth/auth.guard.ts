import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determines whether a route can be activated based on authentication status.
   * @param next - The next route to be activated.
   * @param state - The state of the router at the time of activation.
   * @returns boolean - True if the user is authenticated, otherwise false.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access if the user is logged in
    } else {
      this.handleUnauthorizedAccess(state.url); // Handle unauthorized access
      return false; // Prevent access if the user is not logged in
    }
  }

  /**
   * Handles unauthorized access by redirecting the user to the login page.
   * @param redirectUrl - The URL the user attempted to access.
   */
  private handleUnauthorizedAccess(redirectUrl: string): void {
    // Navigate to the login page and optionally pass the attempted URL
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: redirectUrl }
    }).catch(error => {
      console.error('Navigation error:', error); // Log any navigation errors
    });
  }
}
