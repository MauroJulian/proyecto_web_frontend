import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GmailService } from '../../services/gmail.service';
import { Email } from '../../interfaces/response-email.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly emailService: GmailService = inject(GmailService);
  private readonly router: Router = inject(Router);

  public isLoading: boolean = true;
  public emails: Email[] = [];

  ngOnInit(): void {
    this.emailService.getAllEmails().subscribe((emails: Email[]) => {
      this.emails = emails;
      this.isLoading = false;
    });
  }

  deleteEmail(emailId: string): void {
    this.emails = this.emails.filter((email: Email) => email.id !== emailId);
  }

  sendEmail(): void {
    this.router.navigateByUrl('/send-email');
  }
}
