import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { EmailMessage } from '../interfaces/email-message';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

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

    return emailjs.send(
      environment.emailJs.serviceId,
      environment.emailJs.templateId,
      templateParams
    );
  }
}
