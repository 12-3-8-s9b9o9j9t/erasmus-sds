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
    { name: "Computing", link: "faculties/computing" },
    { name: "Architecture", link: "faculties/architecture" },
    { name: "Mechanical Engineering", link: "faculties/mechanicalengineering" },
    { name: "Chemical Technology", link: "faculties/chemicaltechnology" },
    { name: "Civil Engineering", link: "faculties/civilengineering" },
    { name: "Engineering Management", link: "faculties/engineeringmanagement" },
    { name: "Environmental Engineering and Energy", link: "faculties/environmentalengineeringandenergy" },
    { name: "Materials Engineering", link: "faculties/materialsengineering" }, 
    { name: "Automatic Control and Robotics", link: "faculties/automaticcontrolandrobotics" },
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
