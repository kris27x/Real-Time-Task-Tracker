import { ApplicationConfig } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-management/task-list/task-list.component';
import { TaskFormComponent } from './task-management/task-form/task-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { appRoutes } from './app.routes';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Main application configuration for Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Core Angular modules
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,

    // Angular Material modules for UI components
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,  // Module for snack bar notifications

    // Router setup with defined routes
    provideRouter(appRoutes),
    RouterModule,

    // Application services and guards for authentication and route protection
    AuthService,
    AuthGuard, provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),
  ],
};
