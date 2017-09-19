import { Injectable } from '@angular/core';

import { IDepartment } from '../models/department.model';
import { DataService } from './data.service';

@Injectable()
export class StorageService {

  constructor(
    private dataService: DataService
  ) {
  }

  async getDepartments(): Promise<IDepartment[]> {
    const departments: IDepartment[] = await this.dataService.getDepartments();
    if (departments === null) {
      return JSON.parse(localStorage.getItem('departments'));
    } else {
      localStorage.setItem('departments', JSON.stringify(departments));
      return departments;
    }
  }

}
