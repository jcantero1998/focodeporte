import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EmailMessage } from '../../core/models/email-message.interface';
import { SpinnerService } from '../../core/services/spinner.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly spinnerService = inject(SpinnerService)

  constructor() {
    emailjs.init(environment.emailJs.userId);
  }

  sendEmail(message: EmailMessage): Promise<EmailJSResponseStatus> {
    const templateParams: Record<string, unknown> = {
      from_name: message.from_name,
      from_email: message.from_email,
      subject: message.subject,
      message: message.message
    };

    this.spinnerService.show();

    return emailjs.send(
      environment.emailJs.serviceId,
      environment.emailJs.templateId,
      templateParams
    ).finally(() => {
      this.spinnerService.hide();
    });
  }
}
