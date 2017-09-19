import { Component, AfterViewInit } from '@angular/core';

import { StorageService} from '../../services/storage.service';
import { IDepartment } from '../../services/data.service';

@Component({
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements AfterViewInit {

  departments: Promise<IDepartment[]>;

  constructor(private storage: StorageService) {
  }

  ngAfterViewInit() {
    this.departments = this.storage.getDepartments();
  }

}
