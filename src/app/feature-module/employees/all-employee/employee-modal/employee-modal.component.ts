import { Component, Input, OnInit } from '@angular/core';
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

  @Input() newEmployee: Employee = {id: 0, lastName: '', firstName: '', email: '', dateNaissance:  new Date(), dateEmbauche: new Date() , telephone: '', poste: 0, department: ''};
  employee: Employee[] = [];
  designations: Designation[] = [];
  departements: Department[] = [];

  public employees: Employee = {
    id: 0, // Temporary placeholder; actual ID should be set when editing
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dateDepart: new Date(),
    telephone: '',
    department: '',
    poste: 0
  };
  

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
        this.newEmployee = {id: 0, lastName: '', firstName: '', email: '', dateNaissance: new Date(), dateEmbauche: new Date() , telephone: '', poste: 0, department: ''};
      },
      error => {
        console.error('Error adding employee:', error);
        // Handle any errors here
      }
    );
  }

  // updateEmployee(employee: Employee) {
  //   if (employee.id === undefined) {
  //     console.error('Attempted to update an employee without an ID');
  //     return;
  //   }
  
  //   this.employeeService.updateEmployee(employee.id, employee).subscribe({
  //     next: () => {
  //       alert('Employee updated successfully');
  //       this.loadEmployees(); // Reload the employees list to reflect the update
  //     },
  //     error: (error) => {
  //       console.error('There was an error!', error);
  //       alert('Failed to update employee');
  //     }
  //   });
  // }

  updateEmployee() {
    if (this.employees.id) {
      this.employeeService.updateEmployee(this.employees).subscribe({
        next: () => {
          alert('Employee updated successfully');
          // Additional logic to handle successful update
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          alert('Failed to update employee');
        }
      });
    } else {
      console.error('Employee ID is missing');
    }
  }
  

}
