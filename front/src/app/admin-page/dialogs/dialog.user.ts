import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { User } from "../admin-page.component";

@Component({
    selector: "app-dialog-user",
    templateUrl: "./dialog.user.html",
    standalone: true,
    imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatCheckboxModule]
})
export class DialogUser {

    constructor(
        public dialogRef: MatDialogRef<DialogUser>,
        @Inject(MAT_DIALOG_DATA) public user: User,
    )
    {}

}