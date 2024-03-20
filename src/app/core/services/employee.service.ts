import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { User } from "src/app/modal/entities/user.interface";

@Injectable({ providedIn: 'root'})
export class employeeService {

    private baseUrl = 'http://localhost:8080/api/v1/employees';

    constructor(private http: HttpClient) {}

    findAll() : Observable<User[]> {
        return this.http.get<any>(this.baseUrl).pipe(map(data=> data.data));
    }
}