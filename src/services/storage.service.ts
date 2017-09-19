import { Injectable } from '@angular/core';

import { IDepartment } from '../models/department.model';
import { IEmployee } from '../models/employee.model';
import { DataService } from './data.service';

@Injectable()
export class StorageService {

  constructor(
    private dataService: DataService
  ) {
  }

  getEmpoyeesFromDepartment(employees: IEmployee[], department: string): IEmployee[] {
    return employees.filter((element) => element.department === department);
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

  async getEmployees(department?: string): Promise<IEmployee[]> {
    let employees: IEmployee[] = await this.dataService.getEmployees();

    if (employees === null) {
      employees = JSON.parse(localStorage.getItem('employees'));
    } else {
      localStorage.setItem('employees', JSON.stringify(employees));
    }

    return department === undefined ? employees : this.getEmpoyeesFromDepartment(employees, department);
  }

}
