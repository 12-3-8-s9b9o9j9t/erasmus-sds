import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit{
  
  @Input()
  public name: string | undefined;

  public backgroundColor: string = "";

  getInitial(): string {
    if (this.name) {
      return this.name.charAt(0).toUpperCase();
    }
    return '';
  }

  getRandomColor(): string {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  ngOnInit(): void {
    this.backgroundColor = this.getRandomColor();
  }

}
