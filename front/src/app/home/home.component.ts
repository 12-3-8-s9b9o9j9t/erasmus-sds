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

  async ngOnInit(): Promise<void> {
    const cs: any = await this.apiService.get({endpoint: "/courses"});
    
    for(let c of cs) {
      this.courses.push({id: c.id, title: c.name, description: c.description, ECTSpoints: c.ECTS})
    }
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
