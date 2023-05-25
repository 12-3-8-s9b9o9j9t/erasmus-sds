import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Faculty {
  name: string,
  link: string
}

@Component({
  selector: 'app-faculties-list-page',
  templateUrl: './faculties-list-page.component.html',
  styleUrls: ['./faculties-list-page.component.scss']
})
export class FacultiesListPageComponent {

  public faculties: Faculty[] = [
    { name: "Computing", link: "computing" },
    { name: "Architecture", link: "architecture" },
    { name: "Mechanical Engineering", link: "mechanicalengineering" },
    { name: "Chemical Technology", link: "chemicaltechnology" },
    { name: "Civil Engineering", link: "civilengineering" },
    { name: "Engineering Management", link: "engineeringmanagement" },
    { name: "Environmental Engineering and Energy", link: "environmentalengineeringandenergy" },
    { name: "Materials Engineering", link: "materialsengineering" }, 
    { name: "Automatic Control and Robotics", link: "automaticcontrolandrobotics" },
  ]

  private readonly router: Router;

  constructor(
    router: Router,
  ) {
    this.router = router;
  }

  goToFaculty(link: string) {
    this.router.navigateByUrl(link);
  }

}
