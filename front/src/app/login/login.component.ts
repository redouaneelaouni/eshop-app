// auth/components/login/login.component.ts
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {MessageService} from 'primeng/api';
import {Button, ButtonDirective} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {PasswordModule} from "primeng/password";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {getLoadingSelector, State} from "../store";
import {Store} from "@ngrx/store";
import {Login} from "../store/authentication/auth.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Button,
    ToastModule,
    PasswordModule,
    NgClass,
    ButtonDirective,
    NgIf,
    AsyncPipe
  ],
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private store: Store<State>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.loading$ = this.store.select(getLoadingSelector)
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.store.dispatch(new Login(this.loginForm.value))
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
