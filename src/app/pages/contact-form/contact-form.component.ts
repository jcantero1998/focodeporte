import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailMessage } from '../../core/models/email-message.interface';
import { EmailService } from '../../shared/services/email.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class AddressFormComponent {
  title = inject(Title);
  private formBuilder = inject(FormBuilder);
  private emailService = inject(EmailService);
  private snackBar = inject(MatSnackBar);

  contactForm: FormGroup = this.formBuilder.group({
    from_name: ['', Validators.required],
    from_email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  async sendEmail() {
    if (this.contactForm.valid) {

      const emailMessage: EmailMessage = this.contactForm.value;

      try {
        const response = await this.emailService.sendEmail(emailMessage);
        console.log('SUCCESS!', response.status, response.text);
        this.snackBar.open("Formulario enviado con éxito", "Cerrar");
        this.contactForm.reset();
      } catch (error) {
        console.error('FAILED...', error);
        this.snackBar.open("Se ha producido un error", "Cerrar");
      }
    }
  }

}
