import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../home/home.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  private readonly route: ActivatedRoute;

  private readonly router: Router;

  public course: Course;

  public comments: Comment[] = [];

  public commentForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
    }
  )

  constructor(
    route: ActivatedRoute,
    router: Router
  ) {
    this.router = router;
    this.route = route;
    this.course = { title: "", id: 0, description: "", ECTSpoints: 0};
  }

  sendComment(): void {
    let payload = this.commentForm.value;
    // TO DO : post a comment
  }

  ngOnInit(): void {
    let id: string | null= this.route.snapshot.paramMap.get("id");
    if (id == null) return ;

    // TO DO : get by id

    this.course = { id: +id, title: "title of the course", description: "Lorem ipsum dolor sit amet, " +
        "consectetur adipisicing elit. Aspernatur culpa doloremque eum ex id quae " +
        "temporibus voluptatibus? Asperiores expedita impedit ipsa molestiae obcaecati " +
        "tempore velit!", ECTSpoints: 6};

    // TO DO : get comment for this course
    const c: Comment = { name: "hector", content: "papapapapapapa mais non jte crois pannnnn nnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnn nnnnnnnnnnnnnn nnnnnnnnnnnnn nnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnns" };
    for(let i = 0; i < 20; i++) {
      this.comments.push(c);
    }

  }
}

class Comment {
  public name: string;

  public content: string;

  constructor(
    name: string,
    content: string,
  ){
    this.name = name;
    this.content = content;
  }
}
