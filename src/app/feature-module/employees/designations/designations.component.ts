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
  // private getTableData(): void {
  //   this.lstDesignation = [];
  //   this.serialNumberArray = [];

  //   this.data.getDesignations().subscribe((res: apiResultFormat) => {
  //     this.totalData = res.totalData;
  //     res.data.map((res: getDesignations, index: number) => {
  //       const serialNumber = index + 1;
  //       if (index >= this.skip && serialNumber <= this.limit) {
  //         res.id = serialNumber;
  //         this.lstDesignation.push(res);
  //         this.serialNumberArray.push(serialNumber);
  //       }
  //     });
  //     this.dataSource = new MatTableDataSource<getDesignations>(this.lstDesignation);
  //     this.calculateTotalPages(this.totalData, this.pageSize);
  //   });

 
  // }

  // public sortData(sort: Sort) {
  //   const data = this.lstDesignation.slice();

  //   /* eslint-disable @typescript-eslint/no-explicit-any */
  //   if (!sort.active || sort.direction === '') {
  //     this.lstDesignation = data;
  //   } else {
  //     this.lstDesignation = data.sort((a: any, b: any) => {
  //       const aValue = (a as any)[sort.active];
  //       const bValue = (b as any)[sort.active];
  //       return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
  //     });
  //   }
  // }

  // public searchData(value: string): void {
  //   this.dataSource.filter = value.trim().toLowerCase();
  //   this.lstDesignation = this.dataSource.filteredData;
  // }

  // public getMoreData(event: string): void {
  //   if (event === 'next') {
  //     this.currentPage++;
  //     this.pageIndex = this.currentPage - 1;
  //     this.limit += this.pageSize;
  //     this.skip = this.pageSize * this.pageIndex;
  //     this.getTableData();
  //   } else if (event === 'previous') {
  //     this.currentPage--;
  //     this.pageIndex = this.currentPage - 1;
  //     this.limit -= this.pageSize;
  //     this.skip = this.pageSize * this.pageIndex;
  //     this.getTableData();
  //   }
  // }

  // public moveToPage(pageNumber: number): void {
  //   this.currentPage = pageNumber;
  //   this.skip = this.pageSelection[pageNumber - 1].skip;
  //   this.limit = this.pageSelection[pageNumber - 1].limit;
  //   if (pageNumber > this.currentPage) {
  //     this.pageIndex = pageNumber - 1;
  //   } else if (pageNumber < this.currentPage) {
  //     this.pageIndex = pageNumber + 1;
  //   }
  //   this.getTableData();
  // }

 

  // private calculateTotalPages(totalData: number, pageSize: number): void {
  //   this.pageNumberArray = [];
  //   this.totalPages = totalData / pageSize;
  //   if (this.totalPages % 1 !== 0) {
  //     this.totalPages = Math.trunc(this.totalPages + 1);
  //   }
  //   for (let i = 1; i <= this.totalPages; i++) {
  //     const limit = pageSize * i;
  //     const skip = limit - pageSize;
  //     this.pageNumberArray.push(i);
  //     this.pageSelection.push({ skip: skip, limit: limit });
  //   }
  // }
}
export interface pageSelection {
  skip: number;
  limit: number;
}
