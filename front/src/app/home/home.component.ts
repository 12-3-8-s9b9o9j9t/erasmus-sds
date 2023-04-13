import {Component, Inject, OnInit} from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly apiService: ApiHelperService;

  public courses: Course[] = [];

  constructor(
    apiHelperService: ApiHelperService
  ) {
    this.apiService = apiHelperService;
  }

  ngOnInit(): void {
    let c : Course = { title: "title of the course", description: "Lorem ipsum dolor sit amet, " +
        "consectetur adipisicing elit. Aspernatur culpa doloremque eum ex id quae " +
        "temporibus voluptatibus? Asperiores expedita impedit ipsa molestiae obcaecati " +
        "tempore velit!", ECTSpoints: 6};

    for (let i = 0; i < 20; i++)
      this.courses.push(c);
  }

}

class Course {
  public title: string;

  public description: string;

  public ECTSpoints: number;

  constructor(
    title: string,
    description: string,
    ECTSpoints: number
  ) {
    this.title = title;
    this.description = description;
    this.ECTSpoints = ECTSpoints;
  }
}
