import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faculties, Faculty } from '../constants/constants';

@Component({
  selector: 'app-faculties-list-page',
  templateUrl: './faculties-list-page.component.html',
  styleUrls: ['./faculties-list-page.component.scss']
})
export class FacultiesListPageComponent {

  private readonly router: Router;

  public faculties: Faculty[] = faculties;

  constructor(
    router: Router,
  ) {
    this.router = router;
  }

}
