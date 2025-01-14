// contact.component.ts
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// PrimeNG Imports
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
// route configuration (app.routes.ts)
import {Routes} from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="card">
      <p-card header="Contact">
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
          <div class="flex flex-column gap-4">
            <!-- Email input -->
            <div class="field">
              <span class="p-float-label">
                <input
                  id="email"
                  type="email"
                  pInputText
                  formControlName="email"
                  [ngClass]="{'ng-invalid ng-dirty': isFieldInvalid('email')}"
                  class="w-full"
                >
                <label for="email">Email*</label>
              </span>
              <small *ngIf="isFieldInvalid('email')" class="p-error block">
                {{ getErrorMessage('email') }}
              </small>
            </div>

            <!-- Message textarea -->
            <div class="field">
              <span class="p-float-label">
                <textarea
                  id="message"
                  pInputTextarea
                  formControlName="message"
                  [rows]="5"
                  [autoResize]="true"
                  [ngClass]="{'ng-invalid ng-dirty': isFieldInvalid('message')}"
                  class="w-full"
                ></textarea>
                <label for="message">Message*</label>
              </span>
              <small *ngIf="isFieldInvalid('message')" class="p-error block">
                {{ getErrorMessage('message') }}
              </small>
              <div class="text-right text-sm text-500">
                {{messageLength}}/300 caractères
              </div>
            </div>

            <!-- Submit button -->
            <div class="flex justify-content-end">
              <p-button
                type="submit"
                label="Envoyer"
                icon="pi pi-send"
                [loading]="loading"
                [disabled]="!contactForm.valid || loading"
              ></p-button>
            </div>
          </div>
        </form>
      </p-card>
    </div>

    <p-toast></p-toast>
  `,
  styles: [`
    :host {
      display: block;
      padding: 2rem;
    }
    .field {
      margin-bottom: 1rem;
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  get messageLength(): number {
    return this.contactForm.get('message')?.value?.length || 0;
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.contactForm.get(field);
    return !!(formControl?.invalid && (formControl?.dirty || formControl?.touched));
  }

  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);

    if (control?.hasError('required')) {
      return `Le champ ${field} est requis`;
    }

    if (control?.hasError('email')) {
      return 'Veuillez entrer une adresse email valide';
    }

    if (control?.hasError('maxlength')) {
      return `Le message ne doit pas dépasser 300 caractères`;
    }

    return '';
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.loading = true;

      this.http.post('/api/contact', this.contactForm.value)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Demande de contact envoyée avec succès'
            });
            this.contactForm.reset();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: "Une erreur s'est produite lors de l'envoi du message"
            });
          },
          complete: () => {
            this.loading = false;
          }
        });
    } else {
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}

export const routes: Routes = [
  {
    path: 'contact',
    component: ContactComponent
  }
];
