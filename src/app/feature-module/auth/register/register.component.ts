import { Component, OnDestroy } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService
      .register({ name: this.name, email: this.email, password: this.password })
      .subscribe({
        next: (data) => {
          console.log(data.token);
          this.router.navigate(["/login"]);
        },
      });
  }
}
