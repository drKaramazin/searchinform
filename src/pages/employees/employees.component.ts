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
  employee: IEmployee;
  employeeId: string;
  private employeeIdRoute$: Subscription;
  image: string;

  constructor(
    private storage: StorageService,
    private route: ActivatedRoute,
  ) {
  }

  async ngAfterViewInit() {
    this.employeeIdRoute$ = this.route.params.subscribe(async params => {
      this.employeeId = params['id'];
      await this.getEmployee(this.employeeId);
    });
  }

  async getEmployee(id: string) {
    this.employee = await this.storage.getEmployee(id);
    console.log(this.employee);
  }

  ngOnDestroy() {
    this.employeeIdRoute$.unsubscribe();
  }

  async photoSelect(event) {
    if (this.employee) {
      const file: File = event.target.files[0];
      const myReader: FileReader = new FileReader();

      myReader.onloadend = async (e) => {
        this.image = myReader.result;
        await this.storage.updatePhotoCache(this.employee.photo, this.image);
        await this.getEmployee(this.employeeId);
      }
      myReader.readAsDataURL(file);
    } else {
      console.error('Emploee not loading');
    }
  }

}
