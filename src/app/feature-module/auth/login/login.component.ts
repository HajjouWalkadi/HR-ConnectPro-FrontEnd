import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService, routes } from 'src/app/core/core.index';
//import { WebStorage } from 'src/app/core/services/storage/web.storage';

interface returndata {
  message: string | null;
  status: string | null;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    // Call the authenticate method from AuthService
    this.authService.authenticate({ email: this.email, password: this.password })
      // .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (authenticationResponse) => {
            // Authentication successful, perform necessary actions
            console.log('Authentication successful:', authenticationResponse);

            localStorage.setItem('authToken', authenticationResponse.token);

            // localStorage.setItem('name', authenticationResponse.name);
           // localStorage.setItem('email', authenticationResponse.email);
            // localStorage.setItem('role', authenticationResponse.role.name);

            // Extract and store authority names in local storage
            // const authorityNames = authenticationResponse.role.authorities.map((authority: any) => authority.name);
            // localStorage.setItem('authorities', JSON.stringify(authorityNames));

            // Redirect the user to /role
            this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Handle authentication error
          console.error('Authentication failed:', error);
        }
      );
  }

}
