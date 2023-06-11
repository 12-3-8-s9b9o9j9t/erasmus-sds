import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Course } from '../home/home.component';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { Faculty, gradeMap } from '../constants/constants';
import { faculties } from '../constants/constants';
import { getName } from '../services/storage.service';

@Component({
  selector: 'app-ola-page',
  templateUrl: './ola-page.component.html',
  styleUrls: ['./ola-page.component.scss']
})
export class OlaPageComponent implements OnInit {

  private readonly apiService: ApiHelperService;

  public searchFormGroup: FormGroup = new FormGroup({
    search: new FormControl(''),
    faculty: new FormControl('')
  });

  public faculties: Faculty[] = faculties;

  // all courses whithout search filter
  public allCourses: Course[] = [];

  // filtered courses with search
  public filteredCourses: Course[] = [];

  // selectionned courses by the user
  public selectedCourses: Course[] = [];

  // total of ECTS points of the selectionned courses
  public totalECTSpoints: number = 0;

  public loaded: boolean = false;

  constructor(
    api: ApiHelperService,
  ) {
    this.apiService = api;
  }

  async ngOnInit(): Promise<void> {
    this.searchFormGroup.valueChanges.subscribe((value) => {
      this.filteredCourses = this._filter(value);
    });

    const cs: any = await this.apiService.get({ endpoint: "/courses" });

    for (let c of cs) {
      this.allCourses.push({
        id: c.id,
        title: c.name,
        description: c.description,
        ECTSpoints: c.ECTS,
        ECTScard: c.ECTScard,
        semester: c.semester,
        grade: gradeMap[Math.round(c.rating) as keyof typeof gradeMap],
        faculties: c.faculties
      });
    }
    this.filteredCourses = this.allCourses;

    this.loaded = true;
  }

  _filter(value: any): Course[] {

    const search = value.search.toLowerCase();
    const faculty = value.faculty;

    console.log(faculty)

    return this.allCourses
      .filter(course => course.title.toLowerCase().includes(search))
      .filter(course => !this.selectedCourses.includes(course))
      .filter(course => course.faculties === faculty || faculty === "");
  }

  selectCourse(id: number): void {
    const course: Course | undefined = this.filteredCourses.find(c => c.id === id);

    if (course == undefined) {
      return;
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
      return;
    }

    // update the arrays
    if (this.filteredCourses.find(c => c.id == course.id) == undefined) {
      this.filteredCourses.push(course);
      // update ects points
      this.totalECTSpoints -= course.ECTSpoints;
    }

    this.selectedCourses = this.selectedCourses.filter(c => c.id !== course.id);

    //this.filteredCourses = this._filter(this.searchFormGroup);

    this.orderArrays();
  }

  orderArrays(): void {
    this.filteredCourses.sort((c1, c2) => c1.id - c2.id);
    this.selectedCourses.sort((c1, c2) => c1.id - c2.id);
  }

  generatePDF(): void {
    const doc = new jsPDF();

    let img = new Image();
    img.src = 'assets/europe_flag.jpg';
    const h = 50;
    doc.addImage(img, 'jpg', 15, 10, 16 * h / 9 - 20, h); 

    img.src = 'assets/put_logo.png';
    doc.addImage(img, 'png', 140, 10, h, h);

    doc.text("Poznan University of Technology", 15, 70);
    doc.text("Name of the student : " + getName(), 15, 80);


    // table for the selected courses
    let tableBody: RowInput[] = [];

    for (let course of this.selectedCourses) {
      tableBody.push([course.title, course.semester, course.ECTSpoints, course]);
    }

    autoTable(doc, {
      head: [['Course', 'Semester', 'Number of ECTS points']],
      body: tableBody,
      foot: [['Total', this.totalECTSpoints + " ECTS points"]],
      startY: 100
    })

    const pdfBlob = doc.output('blob');

    // Download the PDF file
    saveAs(pdfBlob, 'ola.pdf');

  }

}
