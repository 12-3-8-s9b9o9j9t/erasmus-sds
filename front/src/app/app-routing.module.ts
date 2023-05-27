import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {OlaPageComponent} from "./ola-page/ola-page.component";
import { LoginComponent } from './login/login.component';
import { FacultiesListPageComponent } from './faculties-list-page/faculties-list-page.component';

const routes: Routes = [
  { path: "", redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "faculties", component: FacultiesListPageComponent },
  { path: "faculties/:faculty", component: HomeComponent },
  { path: "faculties/:faculty/course/:id", component: CourseDetailComponent },
  { path: "ola", component: OlaPageComponent },
  { path: "**", redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
