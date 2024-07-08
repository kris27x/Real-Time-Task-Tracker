import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService],
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
   * @param messageService - MessageService for PrimeNG Toast notifications
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
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
          this.showSuccess('Login successful');
        } else {
          // Display an error message if the login credentials are invalid
          this.loginError = 'Invalid username or password';
          this.showError(this.loginError);
        }
      } catch (error) {
        // Log the error to the console for debugging
        console.error('Login error:', error);
        // Display a generic error message to the user
        this.loginError = 'An error occurred during login. Please try again later.';
        this.showError(this.loginError);
      }
    }
  }

  /**
   * Displays a success message using PrimeNG Toast.
   * @param message - The success message to display.
   */
  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  /**
   * Displays an error message using PrimeNG Toast.
   * @param message - The error message to display.
   */
  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
