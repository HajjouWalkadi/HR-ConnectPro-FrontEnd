import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Designation } from "src/app/models/designation";

@Injectable({   
    providedIn: 'root' 
})
export class DesignationService {
    private baseUrl = 'http://localhost:8080/api/v1/poste';

    constructor(private http: HttpClient) {}

    // getAllDesignations() {
    //     return this.http.get<Designation[]>(`${this.baseUrl}`).pipe(map((result: any) => result.data));
    // }

    getAllDesignations(): Observable<Designation[]> {
        return this.http.get<Designation[]>(`${this.baseUrl}`);
    }
    

    addDesignation(designation: Designation): Observable<Designation> {
        return this.http.post<Designation>(`${this.baseUrl}/add`, designation);
    }
}