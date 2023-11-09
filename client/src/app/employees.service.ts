import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './models/employee';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  findEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/employees/${id}`);
  }

  findTasksByEmployeeId(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/employees/${id}/tasks`);
  }

  createTaskByEmployeeId(id: string, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/employees/${id}/tasks`, task);
  }

  updateTaskByEmployeeId(id: string, task: Task): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/employees/${id}/tasks/${task.taskId}`, task);
  }

  deleteTaskByEmployeeId(id: string, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employees/${id}/tasks/${taskId}`);
  }
}
