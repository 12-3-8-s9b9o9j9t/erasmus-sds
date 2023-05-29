import { Component, OnInit } from '@angular/core';
import { Course } from '../home/home.component';
import { ApiHelperService } from '../services/api-helper.service';
import { faculties, gradeMap } from '../constants/constants';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogUser } from './dialogs/dialog.user';
import { MatButtonModule } from '@angular/material/button';
import { DialogCourse } from './dialogs/dialog.course';
import { getID } from '../services/storage.service';

export interface User {
  id: number;

  username: string;

  password?: string;

  isAdmin: boolean;

}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public users: User[] = [];

  public courses: Course[] = [];

  public myUserId: number = getID();


  constructor(
    public dialog: MatDialog,
    public api: ApiHelperService,
  ) { }

  openDialogAddUser() {
    const dialogRef = this.dialog.open(DialogUser, {
      data: { id: 0, username: "", password: "", isAdmin: false }
    });

    dialogRef.afterClosed().subscribe(async result => {
      const userToAdd: User = result as User;

      if (!userToAdd.username || !userToAdd.password) {
        return;
      }

      const payload: any = {
        username: userToAdd.username,
        password: userToAdd.password,
        isAdmin: userToAdd.isAdmin
      }

      try {
        await this.api.post({ endpoint: "/users", data: payload });
      }
      catch (e) {
        console.error("Error when adding a user :", e);
      }

      await this.getUsers();

    });
  }

  openDialogAddCourse() {
    const dialogRef = this.dialog.open(DialogCourse, {
      data: { title: "", description: "", ECTSpoints: 0, semester: "" }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (!result.title || !result.description || result.ECTSpoints <= 0 || !(result.semester === 'summer' || result.semester === 'winter')) {
        return ;
      }

      const courseToAdd = { 
        name: result.title, 
        description: result.description, 
        ECTS: result.ECTSpoints,
        ECTScard: "",
        semester: result.semester,
        faculties: "" 
      };

      try {
        await this.api.post({ endpoint: "/courses", data: courseToAdd });
      }
      catch(e) {
        console.error("Error when adding course :", e);
      }

      await this.getCourses();

    });
  }


  async ngOnInit(): Promise<void> {

    await this.getUsers();

    await this.getCourses();
  }


  async deleteUser(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
      // confirmation is no
      if (!result) {
        return;
      }

      try {
        await this.api.delete({ endpoint: "/users/" + id });
      }
      catch (e) {
        console.error("error when deleting user :", e);
      }
  
      await this.getUsers();

    });
  }

  async deleteCourse(id: number): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogCourseComponent);

    dialogRef.afterClosed().subscribe(async result => {
      // confirmation is no
      if (!result) {
        return;
      }

      try {
        await this.api.delete({ endpoint: "/courses/" + id });
      }
      catch (e) {
        console.error("error when deleting course :", e);
      }
  
      await this.getCourses();

    });
  }

  async getUsers(): Promise<void> {
    try {
      const newusers = await this.api.get({ endpoint: "/users" });
      this.users = newusers;
    }
    catch (e) {
      console.error("Error when getting users :", e);
    }
  }

  async getCourses(): Promise<void> {
    try {
      const allCourses = await this.api.get({ endpoint: "/courses" });

      this.courses = [];

      for (const c of allCourses) {
        const semester: string = c.semester === "summer" ? "⛱️" : "🌨️";

        this.courses.push({
          id: c.id,
          title: c.name,
          description: c.description,
          ECTSpoints: c.ECTS,
          ECTScard: c.ECTScard,
          semester: semester,
          grade: gradeMap[Math.round(c.rating) as keyof typeof gradeMap],
          faculties: c.faculties
        });
      }
    }
    catch (e) {
      console.error("Error when getting courses :", e);
    }
  }



}


//** Dialog components to confirm the delete actions */
@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Are you sure you want to delete this user?</h2>
    <div>
      <button mat-button (click)="dialogRef.close(false)" class="mr-8">Cancel</button>
      <button mat-button color="warn" (click)="dialogRef.close(true)">Delete</button>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }
}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Are you sure you want to delete this course?</h2>
    <div>
      <button mat-button (click)="dialogRef.close(false)" class="mr-8">Cancel</button>
      <button mat-button color="warn" (click)="dialogRef.close(true)">Delete</button>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})
export class ConfirmationDialogCourseComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogCourseComponent>) { }
}
