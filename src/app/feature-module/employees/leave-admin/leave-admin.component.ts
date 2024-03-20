import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getLeave, routes } from 'src/app/core/core.index';
// import { Sort } from '@angular/material/sort';
import { LeaveAdmin } from 'src/app/models/leave-admin';
import { LeaveAdminService } from 'src/app/core/services/leave-admin.service';
import { User } from 'src/app/modal/entities/user.interface';
import { employeeService } from 'src/app/core/services/employee.service';
import { co } from '@fullcalendar/core/internal-common';


@Component({
  selector: 'app-leave-admin',
  templateUrl: './leave-admin.component.html',
  styleUrls: ['./leave-admin.component.scss']
})
export class LeaveAdminComponent implements OnInit {
  leaveAdmin: LeaveAdmin[] = [];
  newLeaveAdmin: LeaveAdmin = {id: 0, typeConge: '', dateDebut: '', dateFin: '', status: '', description: '', leaveDays: 0, employeeId: 0};
  users: User[] = [];

  public routes = routes;
  // pagination variables
  public lastIndex = 0;
  public selected_status: { id: number; value: string; }[] = [];
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  //** / pagination variables

  public changePageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    // this.getTableData();
  }

  constructor(private leaveAdminService: LeaveAdminService, private employeeService: employeeService) {}

  ngOnInit(): void {
    this.loadLeaveAdmin();
    this.employeeService.findAll().subscribe(
      (emplyees: User[]) => {
          this.users = emplyees;
      }
    )
    // this.getTableData();
  }

  loadLeaveAdmin() {
    this.leaveAdminService.getAllLeavesAdmin().subscribe((leaveAdmin: any) => {
      this.leaveAdmin = leaveAdmin;
      console.log(this.leaveAdmin);
      
    });
  }

  addLeaveAdmin() {
    
    this.leaveAdminService.addLeaveAdmin(this.newLeaveAdmin).subscribe(
      () => {
        this.loadLeaveAdmin();
        this.newLeaveAdmin = {id: 0, typeConge: '', dateDebut: '', dateFin: '', status: '', description: '', leaveDays: 0, employeeId: 0};
      },
      error => {
        console.error('Error adding leave:', error);
      }
    );
  }
  changeStatus(conge:LeaveAdmin) {
    console.log(this.selected_status);
    this.leaveAdminService.changeCongeStatus(conge.id, conge.status).subscribe(
      () => {
      },
      error => {
        console.error('Error changing leave status:', error);
      }
    );

  }

  
}
export interface pageSelection {
  skip: number;
  limit: number;

  
}




