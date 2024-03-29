import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { User } from "src/app/modal/entities/user.interface";
import { Employee } from "src/app/models/employee";

@Injectable({ providedIn: 'root'})
export class employeeService {

    private baseUrl = 'http://localhost:8080/api/v1/employees';

    constructor(private http: HttpClient) {}

    findAll() : Observable<User[]> {
        return this.http.get<any>(this.baseUrl).pipe(map(data=> data.data));
    }

    addEmployee(employee: Employee): Observable<any> {
        return this.http.post<Employee>(`${this.baseUrl}/save`, employee);
    }

    deleteEmployee(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
      }

    // updateEmployee(id: number, employeeData: Employee): Observable<Employee> {
    //     return this.http.put<Employee>(`${this.baseUrl}/${id}`, employeeData);
    //   }
    updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, employee);
      }
      
      
}