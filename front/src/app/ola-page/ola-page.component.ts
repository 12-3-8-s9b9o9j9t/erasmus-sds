import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { FormControl } from '@angular/forms';
import { Course } from '../home/home.component';
import { fakeCourses } from '../fake-data/fake-data';

@Component({
  selector: 'app-ola-page',
  templateUrl: './ola-page.component.html',
  styleUrls: ['./ola-page.component.scss']
})
export class OlaPageComponent implements OnInit{

  private readonly apiService: ApiHelperService;

  public searchControl: FormControl = new FormControl("");

  // all courses whithout search filter
  public allCourses: Course[] = [];

  // filtered courses with search
  public filteredCourses: Course[] = [];

  // selectionned courses by the user
  public selectedCourses: Course[] = [];

  // total of ECTS points of the selectionned courses
  public totalECTSpoints: number = 0;

  constructor(
    api: ApiHelperService,
  ) 
  {
    this.apiService = api;
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.filteredCourses = this._filter(value);
    });

    this.allCourses = fakeCourses;
    this.filteredCourses = this.allCourses;
  }

  _filter(value: string): Course[] {
    value = value.toLowerCase();

    return this.allCourses
      .filter(course => course.title.toLowerCase().includes(value))
      .filter(course => !this.selectedCourses.includes(course));
  }

  selectCourse(id: number): void {
    const course: Course | undefined = this.filteredCourses.find(c => c.id === id);

    if (course == undefined) {
      return ;
    }

    // update the arrays
    if (this.selectedCourses.find(c => c.id == course.id) == undefined) {
      this.selectedCourses.push(course);
      // update ects points
      this.totalECTSpoints += course.ECTSpoints;
    }
    
    this.filteredCourses = this.filteredCourses.filter(c => c.id !== course.id);    

    this.orderArrays();
  }

  unselectCourse(id: number): void {
    const course: Course | undefined = this.selectedCourses.find(c => c.id === id);

    if (course == undefined) {
      return ;
    }

    // update the arrays
    if (this.filteredCourses.find(c => c.id == course.id) == undefined) {
      this.filteredCourses.push(course);
      // update ects points
      this.totalECTSpoints -= course.ECTSpoints;
    }

    this.selectedCourses = this.selectedCourses.filter(c => c.id !== course.id);

    this.filteredCourses = this._filter(this.searchControl.value);

    this.orderArrays();
  }

  orderArrays(): void {
    this.filteredCourses.sort((c1, c2) => c1.id - c2.id);
    this.selectedCourses.sort((c1, c2) => c1.id - c2.id);
  }

}
