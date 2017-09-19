import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IEmployee } from '../../models/employee.model';
import { StorageService } from '../../services/storage.service';

@Component({
  templateUrl: './employees-list.component.html',
})
export class EmployeesListComponent implements AfterViewInit, OnDestroy {

  employees: Promise<IEmployee[]>;
  private employeeIdRoute$: Subscription;

  constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
  ) {
  }

  ngAfterViewInit() {
    this.employeeIdRoute$ = this.route.params.subscribe(params => {
      this.employees = this.storage.getEmployees(params['id']);
    });
  }

  ngOnDestroy() {
    this.employeeIdRoute$.unsubscribe();
  }

}
