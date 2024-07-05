import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    RouterModule,
    MatSnackBarModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> = of([]);  // Initialize with an empty observable
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Task>();  // Initialize MatTableDataSource
  loading = false;  // Loading indicator

  constructor(private taskService: TaskService, private snackBar: MatSnackBar) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Initiates the task loading process.
   */
  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Loads the list of tasks from the server and handles loading state and errors.
   */
  loadTasks(): void {
    this.loading = true;
    this.tasks$ = this.taskService.getTasks().pipe(
      catchError(error => {
        this.showError('Failed to load tasks');
        return of([]);  // Return an empty array in case of error
      }),
      finalize(() => this.loading = false)  // Turn off loading indicator once operation completes
    );

    this.tasks$.subscribe(tasks => {
      this.dataSource.data = tasks;  // Assign data to the data source
    });
  }

  /**
   * Deletes a task from the server and reloads the task list.
   * @param id - The ID of the task to delete.
   */
  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).pipe(
        catchError(error => {
          this.showError('Failed to delete task');
          return of();  // Return an empty observable in case of error
        }),
        finalize(() => this.loadTasks())  // Reload tasks after deletion
      ).subscribe();
    }
  }

  /**
   * Displays an error message using Angular Material Snackbar.
   * @param message - The error message to display.
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
