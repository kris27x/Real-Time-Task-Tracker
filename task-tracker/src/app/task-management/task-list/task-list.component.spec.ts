import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  const mockTasks: Task[] = [
    { id: 1, name: 'Test Task 1', description: 'Description 1' },
    { id: 2, name: 'Test Task 2', description: 'Description 2' }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask']);
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TaskService, useValue: spy }
      ]
    })
    .compileComponents();

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    taskService.getTasks.and.returnValue(of(mockTasks));
    taskService.deleteTask.and.returnValue(of(void 0));  // Return Observable<void>

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
    component.deleteTask(1);
    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
    expect(component.loadTasks).toHaveBeenCalled();
  });
});
