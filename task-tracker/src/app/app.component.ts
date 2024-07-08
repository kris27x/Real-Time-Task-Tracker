import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PrimeNGConfig } from 'primeng/api';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'task-tracker';

  /**
   * Constructor for AppComponent
   * @param primengConfig - PrimeNGConfig for configuring PrimeNG components
   */
  constructor(private primengConfig: PrimeNGConfig) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Use this hook to perform any additional initialization.
   */
  ngOnInit(): void {
    this.primengConfig.ripple = true; // Enable ripple effect for PrimeNG components
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Use this hook to perform any cleanup.
   */
  ngOnDestroy(): void {
    // Cleanup logic can go here
  }

  /**
   * Prepare route for animation
   * @param outlet - The router outlet to prepare
   * @returns The animation data for the route or null
   */
  prepareRoute(outlet: RouterOutlet): string | null {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'] ? outlet.activatedRouteData['animation'] : null;
  }
}
