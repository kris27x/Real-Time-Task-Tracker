import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

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
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'task-tracker';

  constructor() {
    // Constructor for potential future dependencies
  }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Use this hook to perform any additional initialization.
   */
  ngOnInit(): void {
    // Initialization logic can go here
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * Use this hook to perform any cleanup.
   */
  ngOnDestroy(): void {
    // Cleanup logic can go here
  }
}
