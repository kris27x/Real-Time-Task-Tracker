import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;  // Form group for the task form
  taskId!: number;       // ID of the task being edited
  isEditMode: boolean = false; // Flag to determine if the form is in edit mode

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Inject MatSnackBar for notifications
  ) {}

  /**
   * Lifecycle hook that runs when the component initializes.
   * Initializes the form and checks if the form is in edit mode.
   */
  ngOnInit(): void {
    // Initialize the form with validation rules
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Check if we are in edit mode and fetch the task data if necessary
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.taskId = +id;
          this.isEditMode = true;
          return this.taskService.getTask(this.taskId);
        }
        return of(null);
      })
    ).subscribe(task => {
      if (task) {
        this.taskForm.patchValue(task);
      }
    }, error => {
      this.showError('Error loading task data');
    });
  }

  /**
   * Handles form submission for adding or updating a task.
   */
  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      if (this.isEditMode) {
        task.id = this.taskId;
        this.taskService.updateTask(task).subscribe(() => {
          this.showSuccess('Task updated successfully');
          this.router.navigate(['/tasks']);
        }, error => {
          this.showError('Error updating task');
        });
      } else {
        this.taskService.addTask(task).subscribe(() => {
          this.showSuccess('Task added successfully');
          this.router.navigate(['/tasks']);
        }, error => {
          this.showError('Error adding task');
        });
      }
    }
  }

  /**
   * Handles the form cancellation action.
   * Navigates back to the task list.
   */
  onCancel(): void {
    this.router.navigate(['/tasks']);
  }

  /**
   * Shows a success notification using Angular Material Snackbar.
   * @param message - The success message to display.
   */
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  /**
   * Shows an error notification using Angular Material Snackbar.
   * @param message - The error message to display.
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
