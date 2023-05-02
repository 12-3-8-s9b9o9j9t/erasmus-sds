import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loggedIn } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	private readonly router: Router;

	public loginFormGroup: FormGroup = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	});

	public registerFormGroup: FormGroup = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		faculty : new FormControl('', Validators.required),
	});

	public faculties: string[] = [
		"Computing",
		"Architecture",
		"Mechanical Engineering",
		"Chemical Technology"
	]



	constructor(
		router: Router
	){
		this.router = router;
	}

	login(): void {
		if (this.loginFormGroup.invalid) {
			return ;
		}

		const formValue = this.loginFormGroup.value;

		const username: string = formValue.username;
		const password: string = formValue.password;

		// TO DO : get /user
		loggedIn();
		this.router.navigateByUrl("faculties");
	}

	register(): void {
		if (this.registerFormGroup.invalid) {
			return ;
		}

		const formValue = this.registerFormGroup.value;

		const username: string = formValue.username;
		const password: string = formValue.password;
		const faculty : string = formValue.faculty;

		// TO DO : post /user
		loggedIn();
		this.router.navigateByUrl("faculties");
	}

	connectAsGuest(): void {
		this.router.navigateByUrl("faculties");
	}
}
