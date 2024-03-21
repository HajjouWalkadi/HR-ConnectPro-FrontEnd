import { Component, OnInit } from '@angular/core';
// import { Sort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import { DataService, apiResultFormat, getDesignations, routes } from 'src/app/core/core.index';
import { DesignationService } from 'src/app/core/services/designation.service';
import { Designation } from 'src/app/models/designation';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent implements OnInit {
  designations: Designation[] = [];
  newDesignation: Designation = {id: 0, nom: '', department: ''};

  public routes = routes;
  // pagination variables
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

  constructor(private designationService: DesignationService) {}

  ngOnInit(): void {
    this.loadDesignations();
    // this.getTableData();
  }

  loadDesignations() {
    this.designationService.getAllDesignations().subscribe((designations: any) => {      
      this.designations = designations.data;
    });
  }

  addDesignation() {
    this.designationService.addDesignation(this.newDesignation).subscribe(
      () => {
        this.loadDesignations();
        this.newDesignation = {id: 0, nom: '', department: ''};
      },
      error => {
        console.error('Error adding designation:', error);
        // Handle any errors here
      }
    );
  }
 
  deleteDesignation(designationId: number) {
    if (confirm('Are you sure you want to delete this designation?')) {
      this.designationService.deleteDesignation(designationId).subscribe({
        next: () => {
          alert('Designation deleted successfully');
          this.loadDesignations(); 
        },
        error: (error) => {
          console.error('There was an error!', error);
          alert(`Failed to delete designation: : ${error.statusText}`);
        }
      });
    }
  }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
