import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private readonly router: Router;

  constructor(
    router: Router
  ) {
    this.router = router;
  }

  goToOLAPage(): void {
    this.router.navigateByUrl("ola");
  }

  goToHome(): void {
    this.router.navigateByUrl("");
  }

  ngOnInit(): void {
  }

}
