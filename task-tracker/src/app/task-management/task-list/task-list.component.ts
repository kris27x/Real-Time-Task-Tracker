import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatDialogModule,
    TableModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> = of([]);  // Initialize with an empty observable
  dataSource: Task[] = [];  // Initialize data source
  loading = false;  // Loading indicator

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

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
      this.dataSource = tasks;  // Assign data to the data source
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
      ).subscribe(() => {
        this.showSuccess('Task deleted successfully');
      });
    }
  }

  /**
   * Displays a success message using Angular Material Snackbar.
   * @param message - The success message to display.
   */
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
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
