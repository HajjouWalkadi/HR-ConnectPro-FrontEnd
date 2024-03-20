
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { LeaveAdmin } from 'src/app/models/leave-admin';

@Injectable({
  providedIn: 'root'
})
export class LeaveAdminService{
  private baseUrl = 'http://localhost:8080/api/v1/conge';

  constructor(private http: HttpClient) {}

  getAllLeavesAdmin(): Observable<LeaveAdmin[]> {
    return this.http.get<LeaveAdmin[]>(`${this.baseUrl}`).pipe(map((result: any) => result.data));
  }

  addLeaveAdmin(leaveadmin: LeaveAdmin): Observable<LeaveAdmin> {
    return this.http.post<LeaveAdmin>(`${this.baseUrl}/save`, leaveadmin);
  }
  changeCongeStatus(conge_id:number,status:string):Observable<any>{
    return this.http.put(`${this.baseUrl}/change-status/`+conge_id,{}, {params: {status}});
  }

  // Add other methods for updating, deleting, etc.
}