import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router, RouterModule} from "@angular/router";
import {MessageService} from "primeng/api";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {Component} from "@angular/core";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="flex align-items-center justify-content-center min-h-screen bg-gray-50">
      <div class="surface-card p-6 shadow-2 border-round w-full md:w-6 lg:w-4">
        <h1 class="text-3xl font-medium mb-2 text-center text-900">Create Account</h1>
        <p class="text-600 mb-6 text-center">Enter your details to register</p>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <input
              pInputText
              formControlName="username"
              placeholder="Username"
              class="w-full p-3"
              [ngClass]="{'ng-invalid ng-dirty': submitted && f['username'].errors}"
            >
            <small class="p-error block mt-1" *ngIf="submitted && f['username'].errors?.['required']">
              Username is required
            </small>
          </div>

          <div class="mb-4">
            <input
              pInputText
              formControlName="firstname"
              placeholder="First Name"
              class="w-full p-3"
              [ngClass]="{'ng-invalid ng-dirty': submitted && f['firstname'].errors}"
            >
            <small class="p-error block mt-1" *ngIf="submitted && f['firstname'].errors?.['required']">
              First name is required
            </small>
          </div>

          <div class="mb-4">
            <input
              pInputText
              type="email"
              formControlName="email"
              placeholder="Email"
              class="w-full p-3"
              [ngClass]="{'ng-invalid ng-dirty': submitted && f['email'].errors}"
            >
            <small class="p-error block mt-1" *ngIf="submitted && f['email'].errors?.['required']">
              Email is required
            </small>
            <small class="p-error block mt-1" *ngIf="submitted && f['email'].errors?.['email']">
              Invalid email format
            </small>
          </div>

          <div class="mb-4">
            <p-password
              formControlName="password"
              [feedback]="true"
              [toggleMask]="true"
              placeholder="Password"
              styleClass="w-full"
              [inputStyleClass]="'w-full p-3' + (submitted && f['password'].errors ? ' ng-invalid ng-dirty' : '')"
            >
              <ng-template pTemplate="header">
                <h6>Pick a password</h6>
              </ng-template>
              <ng-template pTemplate="footer">
                <p class="mt-2">Suggestions</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                  <li>password required</li>
                </ul>
              </ng-template>
            </p-password>
            <small class="p-error block mt-1" *ngIf="submitted && f['password'].errors?.['required']">
              Password is required
            </small>
          </div>

          <div class="flex flex-column gap-3">
            <button
              pButton
              type="submit"
              [loading]="loading"
              class="p-3 text-xl w-full"
              label="Register"
            >
            </button>

            <button
              pButton
              type="button"
              (click)="goToLogin()"
              class="p-3 text-xl w-full p-button-outlined"
              label="Back to Login"
            >
            </button>
          </div>
        </form>
      </div>
    </div>

    <p-toast position="top-right"></p-toast>
  `,
  styles: [`
    :host {
      display: block;
      background: var(--surface-ground);
      min-height: 100vh;
    }
    :host ::ng-deep .p-password {
      width: 100%;
    }
    :host ::ng-deep .p-password-input {
      width: 100%;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.loading = true;
      this.authService.register(this.registerForm.value)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Registration successful! Please login.'
            });
            setTimeout(() => this.router.navigate(['/login']), 1500);
          },
          error: error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error?.message || 'Registration failed'
            });
            this.loading = false;
          }
        });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
