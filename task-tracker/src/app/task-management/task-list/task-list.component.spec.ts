import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { By } from '@angular/platform-browser';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;

  const mockTasks: Task[] = [
    { id: 1, name: 'Test Task 1', description: 'Description 1' },
    { id: 2, name: 'Test Task 2', description: 'Description 2' }
  ];

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask']);
    const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        NoopAnimationsModule,
        TaskListComponent
      ],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { data: {} } } },
        MessageService
      ]
    }).compileComponents();

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    confirmationService = TestBed.inject(ConfirmationService) as jasmine.SpyObj<ConfirmationService>;
    taskService.getTasks.and.returnValue(of(mockTasks));
    taskService.deleteTask.and.returnValue(of(void 0)); // Return Observable<void>

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.tasks$).toBeDefined();
    component.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });
  });

  it('should delete a task', () => {
    spyOn(component, 'loadTasks').and.callThrough();

    const deleteButton = fixture.debugElement.queryAll(By.css('.p-button-danger'))[0].nativeElement;
    deleteButton.click();

    fixture.detectChanges();

    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
    expect(component.loadTasks).toHaveBeenCalled();
  });
});
