import { Component, Inject, OnInit } from '@angular/core';
import { ApiHelperService } from "../services/api-helper.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly apiService: ApiHelperService;

  private readonly router: Router;

  private readonly route: ActivatedRoute;

  public courses: Course[] = [];

  constructor(
    apiHelperService: ApiHelperService,
    router: Router,
    route: ActivatedRoute
  ) {
    this.apiService = apiHelperService;
    this.router = router;
    this.route = route;
  }

  async goToCourseDetail(id: number): Promise<void> {
    await this.router.navigateByUrl("course/" + id);
  }

  async ngOnInit(): Promise<void> {
    const cs: any = await this.apiService.get({ endpoint: "/courses" });

    const faculty: string | null = this.route.snapshot.paramMap.get("faculty");
    if (faculty == null) {
      return;
    }

    for (let c of cs) {
      if (c.faculty === faculty) {
        this.courses.push({ id: c.id, title: c.name, description: c.description, ECTSpoints: c.ECTS, ECTScard: c.ECTScard })
      }
    }
  }

}

export class Course {
  public id: number;

  public title: string;

  public description: string;

  public ECTSpoints: number;

  public ECTScard: string;

  constructor(
    id: number,
    title: string,
    description: string,
    ECTSpoints: number,
    ECTScard: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ECTSpoints = ECTSpoints;
    this.ECTScard = ECTScard;
  }
}
