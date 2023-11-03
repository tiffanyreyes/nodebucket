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
}
