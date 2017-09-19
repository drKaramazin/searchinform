import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface IDepartment {
  id: string,
  name: string,
}

@Injectable()
export class DataService {

  constructor(private http: Http) {
  }

  private getData(): Promise<any> {
    return this.http.get('./assets/data.json')
      .map((res: any) => res.json()).toPromise()
  }

  async getDepartments(): Promise<IDepartment[]> {
    return this.getData().then((data) => {
      return data.departments;
    }).catch((error) => {
      return null;
    });
  }

}
