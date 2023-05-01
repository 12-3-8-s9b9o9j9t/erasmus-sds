import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../home/home.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ApiHelperService } from '../services/api-helper.service';
import { isLoggedIn } from '../services/storage.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  private readonly route: ActivatedRoute;

  private readonly router: Router;

  private readonly apiService: ApiHelperService;

  public course: Course;

  public comments: Comment[] = [];

  public commentForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
    }
  )

  public courseLoaded: boolean = false;

  public commentsLoaded: boolean = false;

  public isConnected: boolean = isLoggedIn();  

  constructor(
    route: ActivatedRoute,
    router: Router,
    api: ApiHelperService
  ) {
    this.router = router;
    this.route = route;
    this.apiService = api;
    this.course = { title: "", id: 0, description: "", ECTSpoints: 0, ECTScard: "" };
  }

  async sendComment(): Promise<void> {
    let formValue = this.commentForm.value;
    console.log(formValue);

    const date = new Date(Date.now()).toDateString();
    const payload = { text: formValue.comment, author: formValue.name, date: date };

    let id: string | null= this.route.snapshot.paramMap.get("id");
    if (id == null) return ;

    const ans = await this.apiService.post({ endpoint: "/comments/"+id, data: payload });
    
    let coms = await this.apiService.get({endpoint: "/comments/course/"+id});

    this.comments = [];

    for (let com of coms) {
      this.comments.push({ name: com.author, content: com.text });
    }
    this.comments = this.comments.reverse(); 
  }

  async ngOnInit(): Promise<void> {
    let id: string | null= this.route.snapshot.paramMap.get("id");
    if (id == null) return ;

    let co = await this.apiService.get({endpoint: "/courses/"+id});

    this.course = { id: co.id, title: co.name, description: co.description, ECTSpoints: co.ECTS, ECTScard: co.ECTScard };

    this.courseLoaded = true;

    let coms = await this.apiService.get({endpoint: "/comments/course/"+id});

    for (let com of coms) {
      this.comments.push({ name: com.author, content: com.text });
    }
    this.comments = this.comments.reverse();

    this.commentsLoaded = true;
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
