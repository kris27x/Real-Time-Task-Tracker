import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

// Angular Material modules for UI components
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Application components, services, and routes
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { appRoutes } from './app.routes';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular core providers
    provideHttpClient(),

    // Reactive forms and other modules
    ReactiveFormsModule,
    FormsModule,

    // Angular Material modules
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,

    // PrimeNG modules
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule,
    ConfirmDialogModule, // Add ConfirmDialogModule for confirmation dialogs

    // PrimeNG services
    MessageService, // Provide MessageService for notifications
    ConfirmationService, // Provide ConfirmationService for dialogs
    PrimeNGConfig, // Provide PrimeNGConfig for global configuration

    // Router setup with defined routes
    provideRouter(appRoutes),

    // Application services and guards
    AuthService,
    AuthGuard,
  ],
};
