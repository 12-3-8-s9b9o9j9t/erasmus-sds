import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {OlaPageComponent} from "./ola-page/ola-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "course/:id", component: CourseDetailComponent },
  { path: "ola", component: OlaPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
