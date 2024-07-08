import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login form', () => {
    const usernameInput = fixture.debugElement.query(By.css('input[formControlName="username"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should display required validation errors when fields are empty', () => {
    component.loginForm.markAllAsTouched();
    fixture.detectChanges();

    const usernameError = fixture.debugElement.query(By.css('small.p-error'));
    const passwordError = fixture.debugElement.queryAll(By.css('small.p-error'))[1];

    expect(usernameError).toBeTruthy();
    expect(usernameError.nativeElement.textContent).toContain('Username is required');
    expect(passwordError).toBeTruthy();
    expect(passwordError.nativeElement.textContent).toContain('Password is required');
  });

  it('should call AuthService login method on form submit with valid data', () => {
    component.loginForm.setValue({ username: 'user', password: 'password' });
    authService.login.and.returnValue(true);

    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith('user', 'password');
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should display error message when login fails', () => {
    component.loginForm.setValue({ username: 'user', password: 'wrongpassword' });
    authService.login.and.returnValue(false);

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorMessage.textContent).toContain('Invalid username or password');
  });
});
