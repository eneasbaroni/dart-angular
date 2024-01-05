import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  notificationPath: 'success' | 'pending' | 'failure' = inject(ActivatedRoute).snapshot.params['notification'];

  _router = inject (ActivatedRoute) //para pobtener los params

}
