import { Injectable } from '@angular/core';

import { IDepartment } from '../models/department.model';
import { IEmployee } from '../models/employee.model';
import { IPhoto } from '../models/photo.model';
import { DataService } from './data.service';

@Injectable()
export class StorageService {

  constructor(
    private dataService: DataService
  ) {
  }

  private getEmpoyeesFromDepartment(employees: IEmployee[], department: string): IEmployee[] {
    return employees.filter((element) => element.department === department);
  }

  private cacheData(itemName: string, data: any) {
    localStorage.setItem(itemName, JSON.stringify(data));
  }

  async getDepartments(): Promise<IDepartment[]> {
    const departments: IDepartment[] = await this.dataService.getDepartments();
    if (departments === null) {
      return JSON.parse(localStorage.getItem('departments'));
    } else {
      this.cacheData('departments', departments);
      return departments;
    }
  }

  async getEmployees(department?: string): Promise<IEmployee[]> {
    let employees: IEmployee[] = await this.dataService.getEmployees();

    if (employees === null) {
      employees = JSON.parse(localStorage.getItem('employees'));
    } else {
      this.cacheData('employees', employees);
    }

    return department === undefined ? employees : this.getEmpoyeesFromDepartment(employees, department);
  }

  async getDapartmentName(id: string): Promise<string> {
    const departments: IDepartment[] = await this.getDepartments();
    const department: IDepartment = departments.find((element) => element.id === id);

    return department.name;
  }

  async getPhotos(): Promise<IPhoto[]> {
    // If phtos cached in localStorage used cache:
    if (localStorage.getItem('photos')) {
      return JSON.parse(localStorage.getItem('photos'));
    } else {
      const photos: IPhoto[] = await this.dataService.getPhotos();
      this.cacheData('photos', photos);

      return photos;
    }
  }

  async getEmployee(id: string): Promise<IEmployee> {
    const employees: IEmployee[] = await this.getEmployees();
    const photos: IPhoto[] = await this.getPhotos();

    const employee = employees.find((element) => element.id === id);
    employee.photoData = photos.find((element) => element.id === employee.photo).data;

    return employee;
  }

  async updatePhotoCache(id: string, photoData: string) {
    const photos: IPhoto[] = await this.getPhotos();
    const index = photos.findIndex((element) => element.id === id);
    photos[index].data = photoData;
    this.cacheData('photos', photos);
  }

}
