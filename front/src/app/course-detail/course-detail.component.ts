import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../home/home.component";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  private readonly route: ActivatedRoute;

  private readonly router: Router;

  public course: Course;

  constructor(
    route: ActivatedRoute,
    router: Router
  ) {
    this.router = router;
    this.route = route;
    this.course = { title: "", id: 0, description: "", ECTSpoints: 0};
  }

  ngOnInit(): void {
    let id: string | null= this.route.snapshot.paramMap.get("id");
    if (id == null) return ;

    // get by id

    this.course = { id: +id, title: "title of the course", description: "Lorem ipsum dolor sit amet, " +
        "consectetur adipisicing elit. Aspernatur culpa doloremque eum ex id quae " +
        "temporibus voluptatibus? Asperiores expedita impedit ipsa molestiae obcaecati " +
        "tempore velit!", ECTSpoints: 6};
  }
}
