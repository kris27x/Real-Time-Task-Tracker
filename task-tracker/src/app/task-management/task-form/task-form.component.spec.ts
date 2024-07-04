import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Task } from '../task.model';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockTask: Task = { id: 1, name: 'Test Task', description: 'Test Description' };

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTask', 'addTask', 'updateTask']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['paramMap'], {
      paramMap: of({ get: () => '1' })
    });

    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;

    taskService.getTask.and.returnValue(of(mockTask));
    taskService.addTask.and.returnValue(of(mockTask));
    taskService.updateTask.and.returnValue(of(mockTask));

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with task data in edit mode', () => {
    expect(component.isEditMode).toBeTrue();
    expect(component.taskForm.value).toEqual({
      name: 'Test Task',
      description: 'Test Description'
    });
  });

  it('should add a new task on form submit in add mode', () => {
    component.isEditMode = false;
    component.taskForm.setValue({ name: 'New Task', description: 'New Description' });
    component.onSubmit();
    expect(taskService.addTask).toHaveBeenCalledWith({ name: 'New Task', description: 'New Description' } as Task);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should update an existing task on form submit in edit mode', () => {
    component.isEditMode = true;
    component.taskForm.setValue({ name: 'Updated Task', description: 'Updated Description' });
    component.onSubmit();
    expect(taskService.updateTask).toHaveBeenCalledWith({ id: 1, name: 'Updated Task', description: 'Updated Description' });
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should navigate back to tasks on cancel', () => {
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
