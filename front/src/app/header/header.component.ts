import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { isLoggedIn } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public readonly router: Router;

  constructor(
    router: Router
  ) {
    this.router = router;
  }

  goToOLAPage(): void {
    this.router.navigateByUrl("ola");
  }

  goToHome(): void {
    const to: string = isLoggedIn() ? "/faculties" : "";
    this.router.navigateByUrl(to);
  }

  ngOnInit(): void {
  }

}
