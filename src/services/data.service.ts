import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IDepartment } from '../models/department.model';
import { IEmployee } from '../models/employee.model';
import { IPhoto } from '../models/photo.model';

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  private dataMock(): Promise<any> {
    return this.http.get('./assets/data.json')
      .map((res: any) => res.json()).toPromise()
  }

  async getDepartments(): Promise<IDepartment[]> {
    return this.dataMock().then((data) => {
      return data.departments;
    }).catch((error) => {
      return null;
    });
  }

  async getEmployees(): Promise<IEmployee[]> {
    return this.dataMock().then((data) => {
      return data.employees;
    }).catch((error) => {
      return null;
    });
  }

  async getPhotos(): Promise<IPhoto[]> {
    return this.dataMock().then((data) => {
      return data.photos;
    }).catch((error) => {
      return null;
    });
  }

}
