import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { DepartmentsComponent } from '../pages/departments/departments.component';
import { EmployeesListComponent } from '../pages/employees-list/employees-list.component';
import { EmployeesComponent } from '../pages/employees/employees.component';

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
    NotFoundComponent,
    DepartmentsComponent,
    EmployeesListComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
