import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterComponent } from './register.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        RegisterComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display registration form', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[formControlName="username"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
    const confirmPasswordInput = fixture.debugElement.query(By.css('input[formControlName="confirmPassword"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should display required validation errors when fields are empty', () => {
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();

    const usernameError = fixture.debugElement.query(By.css('small.p-error'));
    const passwordError = fixture.debugElement.queryAll(By.css('small.p-error'))[1];
    const confirmPasswordError = fixture.debugElement.queryAll(By.css('small.p-error'))[2];

    expect(usernameError).toBeTruthy();
    expect(usernameError.nativeElement.textContent).toContain('Username is required');
    expect(passwordError).toBeTruthy();
    expect(passwordError.nativeElement.textContent).toContain('Password is required');
    expect(confirmPasswordError).toBeTruthy();
    expect(confirmPasswordError.nativeElement.textContent).toContain('Confirm Password is required');
  });

  it('should display minlength validation errors when fields do not meet minlength', () => {
    component.registerForm.setValue({ username: 'usr', password: 'pass', confirmPassword: 'pass' });
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();

    const usernameError = fixture.debugElement.query(By.css('small.p-error'));
    const passwordError = fixture.debugElement.queryAll(By.css('small.p-error'))[1];

    expect(usernameError).toBeTruthy();
    expect(usernameError.nativeElement.textContent).toContain('Username must be at least 4 characters long');
    expect(passwordError).toBeTruthy();
    expect(passwordError.nativeElement.textContent).toContain('Password must be at least 6 characters long');
  });

  it('should display mismatch error when passwords do not match', () => {
    component.registerForm.setValue({ username: 'user', password: 'password', confirmPassword: 'different' });
    component.registerForm.markAllAsTouched();
    fixture.detectChanges();

    const mismatchError = fixture.debugElement.queryAll(By.css('small.p-error')).find(el => el.nativeElement.textContent.includes('Passwords do not match'));

    expect(mismatchError).toBeTruthy();
  });

  it('should call AuthService register method on form submit with valid data', () => {
    component.registerForm.setValue({ username: 'user', password: 'password', confirmPassword: 'password' });
    authService.register.and.returnValue(true);

    component.onSubmit();
    expect(authService.register).toHaveBeenCalledWith('user', 'password');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display error message when registration fails', () => {
    component.registerForm.setValue({ username: 'user', password: 'password', confirmPassword: 'password' });
    authService.register.and.returnValue(false);

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMessage.textContent).toContain('Registration failed. Please try again.');
  });
});
