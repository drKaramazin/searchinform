import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { IEmployee } from '../../models/employee.model';
import { StorageService } from '../../services/storage.service';

@Component({
  templateUrl: './employees-list.component.html',
})
export class EmployeesListComponent implements AfterViewInit, OnDestroy {

  departmentId: string;
  employees: Promise<IEmployee[]>;
  private employeeIdRoute$: Subscription;

  constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngAfterViewInit() {
    this.employeeIdRoute$ = this.route.params.subscribe(params => {
      this.departmentId = params['id'];
      this.employees = this.storage.getEmployees(this.departmentId);
    });
  }

  ngOnDestroy() {
    this.employeeIdRoute$.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

}
