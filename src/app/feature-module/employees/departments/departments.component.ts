// departments.component.ts

import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/core/services/department.service';
import { Department } from 'src/app/models/department';
import { DataService, apiResultFormat, getDepartment, routes } from 'src/app/core/core.index';
import { pageSelection } from '../designations/designations.component';


@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  public routes = routes;
  newDepartment: Department = {id: 0, nom: ''};

  //pagination variables
  public lastIndex = 0;
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

 

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {    
    this.loadDepartments();
    // this.getTableData();
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe(departments => {
      this.departments = departments;
      console.log(departments);
      
    });
  }

  addDepartment() {
    this.departmentService.addDepartment(this.newDepartment).subscribe(
      () => {
        this.loadDepartments();
        this.newDepartment = {id: 0, nom: ''};
        // this.modalService.dismiss('add_department'); // Close the modal using NgbModal
      },
      error => {
        console.error('Error adding department:', error);
        // Handle any errors here
      }
    );
  }

  
  deleteDepartment(departmentId: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(departmentId).subscribe({
        next: () => {
          alert('Department deleted successfully');
          this.loadDepartments(); // Reload the departments list
        },
        error: (error) => {
          console.error('There was an error!', error);
          alert(`Failed to delete department: : ${error.statusText}`);
        }
      });
    }
  }

  
  
}


