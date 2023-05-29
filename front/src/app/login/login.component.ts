import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getToken, loggedIn, notLoggedIn, saveAdmin, saveID, saveToken } from '../services/storage.service';
import { ApiHelperService } from '../services/api-helper.service';
import { saveName } from '../services/storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	private readonly router: Router;

	private readonly apiService: ApiHelperService;

	public loginFormGroup: FormGroup = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required)
	});

	public registerFormGroup: FormGroup = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		faculty: new FormControl(''),
	});

	public faculties: string[] = [
		"Computing",
		"Architecture",
		"Mechanical Engineering",
		"Chemical Technology"
	]



	constructor(
		router: Router,
		apiService: ApiHelperService
	) {
		this.router = router;
		this.apiService = apiService;
	}

	async login(): Promise<void> {
		if (this.loginFormGroup.invalid) {
			return;
		}

		const formValue = this.loginFormGroup.value;

		const username: string = formValue.username;
		const password: string = formValue.password;

		const payload: any = {
			username: username,
			password: password
		}

		try {
			const token: { access_token: string } = await this.apiService.post({ endpoint: "/auth/login", data: payload });
			
			const user = await this.apiService.get({ endpoint: "/users/name/" + username });

			loggedIn();
			saveName(username);
			saveID(+user.id);
			saveToken(token.access_token);
			saveAdmin(user.isAdmin);
			
			await this.router.navigateByUrl("faculties");
		}
		catch (e) {
			console.error("Login error :", e);
		}
	}

	async register(): Promise<void> {
		if (this.registerFormGroup.invalid) {
			return;
		}

		const formValue = this.registerFormGroup.value;

		const username: string = formValue.username;
		const password: string = formValue.password;
		const faculty: string = formValue.faculty;

		const payload: any = {
			username: username,
			password: password
		}
		
		try {
			const response = await this.apiService.post({ endpoint: "/users", data: payload });
			saveID(response.id);
			saveAdmin(response.isAdmin);

			const token: { access_token: string } = await this.apiService.post({ endpoint: "/auth/login", data: payload });

			loggedIn();
			saveName(username);
			saveToken(token.access_token);

			this.router.navigateByUrl("faculties");
		}
		catch (e) {
			console.error("Register error :", e);
		}
	}

	connectAsGuest(): void {
		saveID(-1);
		saveName("");
		saveToken("");
		notLoggedIn();
		saveAdmin(false);

		this.router.navigateByUrl("faculties");
	}
}
