import { Routes } from '@angular/router';
import { TaskListComponent } from './task-management/task-list/task-list.component';
import { TaskFormComponent } from './task-management/task-form/task-form.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

// Define the application routes
export const appRoutes: Routes = [
  // Redirect root path to the login page
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },

  // Route for the task list, guarded by authentication
  { 
    path: 'tasks', 
    component: TaskListComponent, 
    canActivate: [AuthGuard],
    data: { 
      title: 'Task List',
      animation: 'TaskListPage'
    }
  },

  // Route for adding a new task, guarded by authentication
  { 
    path: 'add-task', 
    component: TaskFormComponent, 
    canActivate: [AuthGuard],
    data: { 
      title: 'Add Task',
      animation: 'AddTaskPage'
    }
  },

  // Route for editing an existing task, guarded by authentication
  { 
    path: 'edit-task/:id', 
    component: TaskFormComponent, 
    canActivate: [AuthGuard],
    data: { 
      title: 'Edit Task',
      animation: 'EditTaskPage'
    }
  },

  // Route for the login page
  { 
    path: 'login', 
    component: LoginComponent,
    data: { 
      title: 'Login',
      animation: 'LoginPage'
    }
  },

  // Route for the registration page
  { 
    path: 'register', 
    component: RegisterComponent,
    data: { 
      title: 'Register',
      animation: 'RegisterPage'
    }
  },

  // Wildcard route to handle any undefined routes, redirecting to the login page
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];
