import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DepartmentService } from 'src/app/core/services/department.service';
import { DesignationService } from 'src/app/core/services/designation.service';
import { employeeService } from 'src/app/core/services/employee.service';
import { Department } from 'src/app/models/department';
import { Designation } from 'src/app/models/designation';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  employee: Employee[] = [];
  designations: Designation[] = [];
  departements: Department[] = [];
  newEmployee: Employee = {id: 0, lastName: '', firstName: '', email: '', dateNaissance: '', dateEmbauche: new Date() , telephone: '', poste: 0, department: ''};


  constructor(
      private employeeService: employeeService,
      private departmentService: DepartmentService,
      private designationService: DesignationService,
    ) {}


  ngOnInit(): void {
    this.loadEmployees();  
    this.loadDepartments();  
    this.loadDesignations();  
  }

  loadEmployees() {
    this.employeeService.findAll().subscribe((employees: any) => {      
      this.employee = employees.data;
    });
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe((employees: any) => {      
      this.departements = employees;
      
    });
  }

  loadDesignations() {
    this.designationService.getAllDesignations().subscribe((employees: any) => {      
      this.designations = employees.data;
    });
  }

  addEmployee() {
    this.employeeService.addEmployee(this.newEmployee).subscribe(
      () => {
        this.loadEmployees();
        this.newEmployee = {id: 0, lastName: '', firstName: '', email: '', dateNaissance: '', dateEmbauche: new Date() , telephone: '', poste: 0, department: ''};
      },
      error => {
        console.error('Error adding employee:', error);
        // Handle any errors here
      }
    );
  }

 

}
