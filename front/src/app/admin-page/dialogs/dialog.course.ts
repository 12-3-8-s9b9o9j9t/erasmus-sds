import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Course } from "src/app/home/home.component";

@Component({
    selector: "app-dialog-course",
    templateUrl: "./dialog.course.html",
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatCheckboxModule, MatSelectModule]
})
export class DialogCourse {

    constructor(
        public dialogRef: MatDialogRef<DialogCourse>,
        @Inject(MAT_DIALOG_DATA) public course: Course,
    )
    {}

}