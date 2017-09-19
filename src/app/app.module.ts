import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { DepartmentsComponent } from '../pages/departments/departments.component';
import { EmployeesListComponent } from '../pages/employees-list/employees-list.component';
import { EmployeesComponent } from '../pages/employees/employees.component';

import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
import { DepartmentNamePipe } from '../pipes/department-name.pipe';

const appRoutes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/:id/employees', component: EmployeesListComponent },
  { path: 'employees/:id', component: EmployeesComponent },
  { path: '',
    redirectTo: '/departments',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DepartmentNamePipe,
    NotFoundComponent,
    DepartmentsComponent,
    EmployeesListComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [DataService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
