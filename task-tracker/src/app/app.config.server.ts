import { mergeApplicationConfig, ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { AuthService } from './auth/auth.service';

// Server-specific configuration for Angular Universal
const serverConfig: ApplicationConfig = {
  providers: [
    // Enable server-side rendering
    provideServerRendering(),

    // Initialize AuthService on server startup
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => {
        try {
          authService.initialize();
        } catch (error) {
          console.error('Error initializing AuthService:', error);
        }
      },
      deps: [AuthService],
      multi: true,
    },
  ],
};

// Merge server-specific config with the main app config
export const config = mergeApplicationConfig(appConfig, serverConfig);
