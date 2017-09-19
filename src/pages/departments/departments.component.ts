import { Component, AfterViewInit } from '@angular/core';

import { IDepartment } from '../../models/department.model';
import { StorageService } from '../../services/storage.service';

@Component({
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements AfterViewInit {

  departments: Promise<IDepartment[]>;

  constructor(private storage: StorageService) {
  }

  ngAfterViewInit() {
    this.departments = this.storage.getDepartments();
  }

}
