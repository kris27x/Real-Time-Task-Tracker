import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError: string = '';

  /**
   * Constructor for RegisterComponent
   * @param fb - FormBuilder to create reactive forms
   * @param authService - AuthService for authentication operations
   * @param router - Router for navigation
   * @param messageService - MessageService for PrimeNG notifications
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    // Initialize the registration form with form controls and validators
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  /**
   * Custom validator to check if password and confirm password fields match
   * @param form - The form group containing the password fields
   * @returns ValidationErrors | null - Returns an error object if passwords do not match, otherwise null
   */
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      // Clear the mismatch error if passwords match
      if (form.get('confirmPassword')?.hasError('mismatch')) {
        delete form.get('confirmPassword')?.errors?.['mismatch'];
        form.get('confirmPassword')?.updateValueAndValidity({ onlySelf: true });
      }
    }
    return null;
  }

  /**
   * Handles the form submission for user registration
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      try {
        const registrationSuccess = this.authService.register(username, password);
        if (registrationSuccess) {
          this.router.navigate(['/login']);
          this.showSuccess('Registration successful! Please login.');
        } else {
          this.registrationError = 'Registration failed. Please try again.';
          this.showError(this.registrationError);
        }
      } catch (error) {
        console.error('Registration error:', error);
        this.registrationError = 'An error occurred during registration. Please try again later.';
        this.showError(this.registrationError);
      }
    }
  }

  /**
   * Shows a success notification using PrimeNG Toast.
   * @param message - The success message to display.
   */
  private showSuccess(message: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  /**
   * Shows an error notification using PrimeNG Toast.
   * @param message - The error message to display.
   */
  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
