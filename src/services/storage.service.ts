import { Injectable } from '@angular/core';

import { DataService, IDepartment } from './data.service';

@Injectable()
export class StorageService {

  constructor(
    private dataService: DataService
  ) {
  }

  async getDepartments(): Promise<IDepartment[]> {
     const departments: IDepartment[] = await this.dataService.getDepartments();
    if (departments === null) {
      return [];
    } else {
      return departments;
    }
  }

}
