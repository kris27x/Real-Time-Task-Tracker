import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

// Enable production mode if the environment is set to production
if (environment.production) {
  enableProdMode();
}

/**
 * Bootstrap the Angular application with the specified configuration.
 * This function will initialize the Angular application with the 
 * root component and the application configuration.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => {
    console.error('Error bootstrapping the application:', err);
    throw err; // Re-throw the error to propagate it correctly
  });
