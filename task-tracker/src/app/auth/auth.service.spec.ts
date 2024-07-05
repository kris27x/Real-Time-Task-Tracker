import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should return true and set token for valid credentials', () => {
      const result = service.login('user', 'password');
      expect(result).toBeTrue();
      expect(localStorage.getItem('authToken')).toBe('fake-jwt-token');
    });

    it('should return false for invalid credentials', () => {
      const result = service.login('invalidUser', 'invalidPassword');
      expect(result).toBeFalse();
      expect(localStorage.getItem('authToken')).toBeNull();
    });
  });

  describe('#logout', () => {
    it('should remove the token and navigate to login', () => {
      service.logout();
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('#isLoggedIn', () => {
    it('should return true if the user is logged in', () => {
      localStorage.setItem('authToken', 'fake-jwt-token');
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('should return false if the user is not logged in', () => {
      localStorage.removeItem('authToken');
      expect(service.isLoggedIn()).toBeFalse();
    });
  });

  describe('#getToken', () => {
    it('should return the token if it exists', () => {
      localStorage.setItem('authToken', 'fake-jwt-token');
      expect(service.getToken()).toBe('fake-jwt-token');
    });

    it('should return null if the token does not exist', () => {
      localStorage.removeItem('authToken');
      expect(service.getToken()).toBeNull();
    });
  });
});
