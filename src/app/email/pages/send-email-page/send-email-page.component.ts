import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GmailService } from '../../services/gmail.service';
import { SendEmail } from '../../interfaces/send-email.interface';

@Component({
  selector: 'app-send-email-page',
  imports: [MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './send-email-page.component.html',
  styleUrl: './send-email-page.component.scss',
})
export class SendEmailPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly matSnackbar = inject(MatSnackBar);
  private readonly emailService = inject(GmailService);
  public emailForm: FormGroup;

  constructor() {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      snippet: [''],
    });
  }

  sendEmail(): void {
    if (this.emailForm.valid) {
      const email: SendEmail = this.emailForm.value;

      this.emailService.sendEmail(email).subscribe({
        next: () => {
          this.matSnackbar.open('Email enviado correctamente!', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
        error: () => {
          this.matSnackbar.open('Error al enviar el email!', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 3000,
          });
        },
      });
    } else {
      this.matSnackbar.open(
        'Completar todos los campos correctamente!',
        'Cerrar',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        }
      );
      return;
    }
  }
}
