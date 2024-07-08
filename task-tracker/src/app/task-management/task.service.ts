import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from './task.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // URL to web API
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) {}

  /**
   * Fetches all tasks from the server.
   * @returns An observable of Task array.
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  /**
   * Adds a new task to the server.
   * @param task - The task to be added.
   * @returns An observable of the added Task.
   */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task>('addTask'))
      );
  }

  /**
   * Updates an existing task on the server.
   * @param task - The task to be updated.
   * @returns An observable of the updated Task.
   */
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, this.httpOptions)
      .pipe(
        catchError(this.handleError<Task>('updateTask'))
      );
  }

  /**
   * Deletes a task from the server.
   * @param id - The id of the task to be deleted.
   * @returns An observable of void.
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('deleteTask'))
      );
  }

  /**
   * Fetches a single task by id from the server.
   * @param id - The id of the task to be fetched.
   * @returns An observable of Task.
   */
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
  }

  /**
   * Handles HTTP operation that failed.
   * Logs the error and returns a safe result.
   * @param operation - The name of the operation that failed.
   * @param result - Optional value to return as the observable result.
   * @returns A function that returns an observable of the safe result.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log to console instead
      this.showError(`${operation} failed: ${error.message}`);
      // TODO: send the error to remote logging infrastructure
      // Return an empty result so the app keeps running
      return of(result as T);
    };
  }

  /**
   * Shows an error notification using PrimeNG Toast.
   * @param message - The error message to display.
   */
  private showError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
