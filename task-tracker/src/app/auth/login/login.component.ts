import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  /**
   * Constructor for LoginComponent
   * @param fb - FormBuilder to create reactive forms
   * @param authService - AuthService for authentication operations
   * @param router - Router for navigation
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the login form with form controls and validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Handles the form submission for user login
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      try {
        const loginSuccess = this.authService.login(username, password);
        if (loginSuccess) {
          // Navigate to the tasks page on successful login
          this.router.navigate(['/tasks']);
        } else {
          // Display an error message if the login credentials are invalid
          this.loginError = 'Invalid username or password';
        }
      } catch (error) {
        // Log the error to the console for debugging
        console.error('Login error:', error);
        // Display a generic error message to the user
        this.loginError = 'An error occurred during login. Please try again later.';
      }
    }
  }
}
