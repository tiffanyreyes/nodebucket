import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  apiUrl = 'mongodb+srv://web450_admin:m3an@bellevueuniversity.paicaia.mongodb.net/';

  employeeIds: Array<number> = [1007, 1008, 1009, 1010, 1011, 1012];

  constructor(private http: HttpClient) { }

  findEmployeeById(id: string): Observable<any> {
    return this.http.get<any>(`$[this.apiUrl]/employees/${id}`);
  }

  validate(employeeId: number) {
    return this.employeeIds.some(id => id ===employeeId);
  }
}
