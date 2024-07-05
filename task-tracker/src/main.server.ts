import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode, ApplicationRef } from '@angular/core';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { environment } from './environments/environment';

// Enable production mode if the environment is set to production
if (environment.production) {
  enableProdMode();
}

/**
 * Bootstrap the Angular application with the specified server configuration
 * @returns A promise that resolves to the ApplicationRef instance or an error
 */
const bootstrap = (): Promise<ApplicationRef> => bootstrapApplication(AppComponent, config)
  .catch((err) => {
    console.error('Error bootstrapping the server application:', err);
    throw err;  // Re-throw the error to propagate it correctly
  });

export default bootstrap;
