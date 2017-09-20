import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { IEmployee } from '../../models/employee.model';
import { StorageService } from '../../services/storage.service';

@Component({
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements AfterViewInit, OnDestroy {
  employee: Promise<IEmployee>;
  private employeeIdRoute$: Subscription;

  constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
  ) {
  }

  ngAfterViewInit() {
    this.employeeIdRoute$ = this.route.params.subscribe(params => {
      this.employee = this.storage.getEmployee(params['id']);
    });
  }

  ngOnDestroy() {
    this.employeeIdRoute$.unsubscribe();
  }

}
