import { Routes } from '@angular/router';
import { TaskListComponent } from './task-management/task-list/task-list.component';
import { TaskFormComponent } from './task-management/task-form/task-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

// Define the application routes
export const appRoutes: Routes = [
  // Redirect root path to the tasks list
  { 
    path: '', 
    redirectTo: '/tasks', 
    pathMatch: 'full' 
  },

  // Route for the task list, guarded by authentication
  { 
    path: 'tasks', 
    component: TaskListComponent, 
    canActivate: [AuthGuard] 
  },

  // Route for adding a new task, guarded by authentication
  { 
    path: 'add-task', 
    component: TaskFormComponent, 
    canActivate: [AuthGuard] 
  },

  // Route for editing an existing task, guarded by authentication
  { 
    path: 'edit-task/:id', 
    component: TaskFormComponent, 
    canActivate: [AuthGuard] 
  },

  // Route for the login page
  { 
    path: 'login', 
    component: LoginComponent 
  },

  // Route for the registration page
  { 
    path: 'register', 
    component: RegisterComponent 
  },

  // Wildcard route to handle any undefined routes, redirecting to the tasks list
  { 
    path: '**', 
    redirectTo: '/tasks' 
  }
];
