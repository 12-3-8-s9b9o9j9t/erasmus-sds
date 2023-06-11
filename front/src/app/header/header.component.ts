import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { getName, isAdmin } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public admin: boolean = isAdmin();

  public name: string = getName();

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.admin = isAdmin();
      this.name = getName();
    });
  }

  moveToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

}
