import { Pipe, PipeTransform } from '@angular/core';

import { StorageService } from '../services/storage.service';

@Pipe({
  name: 'departmentName'
})
export class DepartmentNamePipe implements PipeTransform {

  constructor(private storage: StorageService) {
  }

  transform(id: string): Promise<string> {
    return this.storage.getDapartmentName(id);
  }

}
