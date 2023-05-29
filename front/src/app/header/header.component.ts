import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { isAdmin } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public admin: boolean = isAdmin();

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.admin = isAdmin();
    });
  }

  moveToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

}
