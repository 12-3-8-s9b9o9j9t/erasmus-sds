import {Component, Inject, OnInit} from '@angular/core';
import {ApiHelperService} from "../services/api-helper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly apiService: ApiHelperService;

  private readonly router: Router;

  public courses: Course[] = [];

  constructor(
    apiHelperService: ApiHelperService,
    router: Router
  ) {
    this.apiService = apiHelperService;
    this.router = router;
  }

  async goToCourseDetail(id: number): Promise<void> {
    await this.router.navigateByUrl("course/"+id);
  }

  ngOnInit(): void {
    let c : Course = { id: 1, title: "title of the course", description: "Lorem ipsum dolor sit amet, " +
        "consectetur adipisicing elit. Aspernatur culpa doloremque eum ex id quae " +
        "temporibus voluptatibus? Asperiores expedita impedit ipsa molestiae obcaecati " +
        "tempore velit!", ECTSpoints: 6};

    for (let i = 0; i < 20; i++)
      this.courses.push(c);
  }

}

export class Course {
  public id: number;

  public title: string;

  public description: string;

  public ECTSpoints: number;

  constructor(
    id: number,
    title: string,
    description: string,
    ECTSpoints: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ECTSpoints = ECTSpoints;
  }
}
