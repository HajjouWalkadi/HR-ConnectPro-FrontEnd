import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, lstEmployee, routes } from 'src/app/core/core.index';
import { DesignationService } from 'src/app/core/services/designation.service';
import { employeeService } from 'src/app/core/services/employee.service';
import { Designation } from 'src/app/models/designation';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-page-content',
  templateUrl: './employee-page-content.component.html',
  styleUrls: ['./employee-page-content.component.scss']
})
export class EmployeePageContentComponent implements OnInit{
  employees: Employee[] = [];
  designations: { [key: number]: string } = {};
  newEmployee: Employee = {id: 0, lastName: '', firstName: '', email: '', dateNaissance: '', dateEmbauche: new Date() , telephone: '', poste: 0, department: ''};
  public routes = routes;
  selected = 'option1';

  // public lstEmployee: Array<lstEmployee>;
  constructor(public router: Router, private employeeService: employeeService, private designationService: DesignationService) {}

  ngOnInit() {
    // this.designationService.getAllDesignations().subscribe((designations: Designation[]) => {
    //   designations.forEach(designation => {
    //     this.designations[designation.id] = designation.nom; 
    //   });

      this.loadEmployees();
    // });
  }

    loadEmployees() {
      this.employeeService.findAll().subscribe((employee: any) => {
        this.employees = employee;
      });
    }
    
  

    getDesignationName(designationId: number | undefined): string {
  if (!designationId) {
    return 'Poste Inconnu';
  }
  return this.designations[designationId] || 'Poste Inconnu';
}

  //  this.lstEmployee = this.dataservice.lstEmployee

  }

  


