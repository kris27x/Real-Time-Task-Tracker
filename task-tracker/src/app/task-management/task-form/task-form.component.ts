import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../task.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;  // Use definite assignment assertion
  taskId!: number;       // Use definite assignment assertion
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

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
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      if (this.isEditMode) {
        task.id = this.taskId;
        this.taskService.updateTask(task).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      } else {
        this.taskService.addTask(task).subscribe(() => {
          this.router.navigate(['/tasks']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
