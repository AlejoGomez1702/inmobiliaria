import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Panel', url: '/dashboard/root', icon: 'prism' },
    { title: 'Propiedades', url: '/dashboard/properties', icon: 'business' },
    { title: 'Mi Agenda', url: '/dashboard/diary', icon: 'calendar' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    public authService: AuthService
  ) {}
}
